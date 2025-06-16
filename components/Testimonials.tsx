'use client';

import { useState, useEffect } from 'react';
import { Star, Plus, Filter, Calendar, User, Camera, Heart, MessageCircle, X, ChevronDown, ChevronUp } from 'lucide-react';
import { db, collection, addDoc, onSnapshot, doc, updateDoc } from './firebase';
import { getDocs, query, where } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';

interface Review {
  id?: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  service: string;
  content: string;
  helpful: number;
  verified: boolean;
  userId?: string;
  liked?: boolean;
}

const DEFAULT_AVATAR = 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop';

const RealtimeReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddReview, setShowAddReview] = useState(false);
  const [filterRating, setFilterRating] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [newReview, setNewReview] = useState({
    service: '',
    rating: 5,
    content: ''
  });
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [localLikes, setLocalLikes] = useState<Record<string, boolean>>({});

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  // Initialize Firebase and set up auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthLoading(false);
    }, (error) => {
      console.error("Auth state error:", error);
      setError("Failed to initialize authentication. Please refresh the page.");
      setAuthLoading(false);
    });
    
    return () => unsubscribe();
  }, [auth]);

  // Load reviews from Firestore
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    const unsubscribe = onSnapshot(
      collection(db, 'reviews'),
      (snapshot) => {
        try {
          const reviewsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Review[];
          setReviews(reviewsData);
          setLoading(false);
        } catch (err) {
          console.error("Error processing reviews:", err);
          setError("Failed to process reviews data.");
          setLoading(false);
        }
      },
      (error) => {
        console.error("Error fetching reviews:", error);
        setError("Could not load reviews. Please check your connection.");
        setLoading(false);
      }
    );

    // Initialize with sample data if collection is empty
    const checkInitialReviews = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'reviews'));
        if (snapshot.empty) {
          const initialReviews = [
            {
              name: 'Perera',
              avatar: 'https://images.pexels.com/photos/1115687/pexels-photo-1115687.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
              rating: 5,
              date: '2024-06-10',
              service: 'Birthday Photography',
              content: 'Noriza captured my birthday with such artistry and emotion. Every photo tells a story, and Ill treasure these memories forever. Her eye for detail and those natural, candid moments is truly exceptional.',
              helpful: 12,
              verified: true
            },
          ];
          
          await Promise.all(initialReviews.map(review => 
            addDoc(collection(db, 'reviews'), review)
          ));
        }
      } catch (error) {
        console.error("Error adding initial reviews:", error);
        // Don't set error state here as it's non-critical
      }
    };
    
    checkInitialReviews();

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setAuthLoading(true);
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError("Failed to sign in with Google. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      setError("Failed to sign out. Please try again.");
    }
  };

  const filteredReviews = reviews
    .filter(review => filterRating === 'all' || review.rating === parseInt(filterRating))
    .sort((a, b) => {
      if (sortBy === 'latest') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === 'highest') return b.rating - a.rating;
      if (sortBy === 'helpful') return b.helpful - a.helpful;
      return 0;
    });

  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(r => r.rating === rating).length / reviews.length) * 100 
      : 0
  }));

  const handleAddReview = async () => {
    if (!user || !newReview.content || !newReview.service) return;
    
    try {
      setError(null);
      await addDoc(collection(db, 'reviews'), {
        name: user.displayName || 'Anonymous',
        avatar: user.photoURL || DEFAULT_AVATAR,
        rating: newReview.rating,
        date: new Date().toISOString().split('T')[0],
        service: newReview.service,
        content: newReview.content,
        helpful: 0,
        verified: true,
        userId: user.uid
      });
      
      setNewReview({ service: '', rating: 5, content: '' });
      setShowAddReview(false);
    } catch (error) {
      console.error('Error adding review:', error);
      setError("Failed to submit review. Please try again.");
    }
  };

  const handleHelpful = async (id: string) => {
    if (!id) return;
    
    try {
      const reviewRef = doc(db, 'reviews', id);
      const review = reviews.find(r => r.id === id);
      if (!review) return;

      const newLikeState = !localLikes[id];
      setLocalLikes(prev => ({ ...prev, [id]: newLikeState }));
      
      await updateDoc(reviewRef, {
        helpful: newLikeState ? review.helpful + 1 : review.helpful - 1
      });
    } catch (error) {
      console.error('Error updating helpful count:', error);
      setLocalLikes(prev => ({ ...prev, [id]: !prev[id] }));
      setError("Failed to update like. Please try again.");
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const renderStars = (
    rating: number,
    size: number = 20,
    interactive: boolean = false,
    onRate: ((rating: number) => void) | null = null
  ) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            type="button"
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
            onClick={interactive ? () => onRate && onRate(i + 1) : undefined}
            aria-label={`${i + 1} star${i !== 0 ? 's' : ''}`}
          >
            <Star
              size={size}
              className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} ${
                interactive ? 'hover:text-yellow-400' : ''
              }`}
            />
          </button>
        ))}
        {interactive && (
          <span className="ml-2 text-sm text-gray-500">
            {rating} star{rating !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    );
  };

  // Determine how many reviews to show
  const REVIEWS_TO_SHOW = 4;
  const displayedReviews = showAllReviews ? filteredReviews : filteredReviews.slice(0, REVIEWS_TO_SHOW);
  const hasMoreReviews = filteredReviews.length > REVIEWS_TO_SHOW;

  return (
    <section id="reviews" className="py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-charcoal mb-6">
            Client <span className="text-gold">Reviews</span>
          </h2>
          <p className="text-lg text-brown max-w-3xl mx-auto">
            See what our clients are saying about their photography experience
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Error Message Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
              <p>{error}</p>
              <button 
                onClick={() => setError(null)} 
                className="mt-2 text-sm underline"
              >
                Dismiss
              </button>
            </div>
          )}

          <div className="bg-white rounded-xl p-8 mb-8 shadow-md border border-gray-100">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start mb-4">
                  <span className="text-5xl font-bold text-charcoal mr-3">
                    {averageRating.toFixed(1)}
                  </span>
                  <div>
                    <div className="flex mb-1">
                      {renderStars(Math.round(averageRating), 24)}
                    </div>
                    <p className="text-brown text-sm">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                
                {authLoading ? (
                  <div className="animate-pulse h-12 w-48 bg-gray-200 rounded-lg mx-auto md:mx-0"></div>
                ) : user ? (
                  <div className="flex flex-col items-center md:items-start">
                    <button
                      onClick={() => setShowAddReview(true)}
                      className="bg-gradient-to-r from-gold to-yellow-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center mb-3 shadow-md hover:shadow-lg"
                    >
                      <Plus size={20} className="mr-2" />
                      Write a Review
                    </button>
                    <div className="flex items-center text-sm text-brown">
                      <img
                        src={user.photoURL || DEFAULT_AVATAR}
                        alt={user.displayName || 'User'}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <span>Signed in as {user.displayName || 'User'}</span>
                      <button 
                        onClick={handleSignOut}
                        className="ml-2 text-xs text-gray-500 hover:text-charcoal"
                      >
                        (Sign out)
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={signInWithGoogle}
                    disabled={authLoading}
                    className="bg-gradient-to-r from-gold to-yellow-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center mx-auto md:mx-0 shadow-md hover:shadow-lg disabled:opacity-70"
                  >
                    <User size={20} className="mr-2" />
                    {authLoading ? 'Signing in...' : 'Sign in to Write a Review'}
                  </button>
                )}
              </div>
              
              <div className="space-y-3">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center text-sm">
                    <span className="w-8 text-brown font-medium">{rating}</span>
                    <Star size={16} className="text-yellow-400 fill-current mr-2" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2.5 mr-3">
                      <div
                        className="bg-gradient-to-r from-gold to-yellow-500 h-2.5 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-brown text-right font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {showAddReview && user && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
              <div className="bg-white rounded-xl p-6 max-w-md w-full relative border border-gray-200 shadow-2xl">
                <button
                  onClick={() => setShowAddReview(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-charcoal"
                  aria-label="Close review modal"
                >
                  <X size={24} />
                </button>
                
                <div className="flex items-center gap-3 mb-6">
                  <img
                    src={user.photoURL || DEFAULT_AVATAR}
                    alt={user.displayName || 'User'}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gold/30"
                  />
                  <div>
                    <h3 className="font-semibold text-charcoal text-lg">{user.displayName || 'User'}</h3>
                    <p className="text-sm text-brown bg-green-100 px-2 py-1 rounded-full inline-flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                      Verified Client
                    </p>
                  </div>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label htmlFor="service" className="block text-brown font-medium mb-2">Service</label>
                    <select
                      id="service"
                      value={newReview.service}
                      onChange={(e) => setNewReview({...newReview, service: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="dronography">Dronography</option>
                      <option value="wedding-photography">Wedding Photography</option>
                      <option value="wedding-videography">Wedding Videography</option>
                      <option value="graduation-photography">Graduations</option>
                      <option value="commercial-work">Commercial Work</option>
                      <option value="event-photography">Event Photography</option>
                      <option value="event-videography">Event Videography</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-brown font-medium mb-2">Your Rating</label>
                    {renderStars(newReview.rating, 28, true, (rating) => 
                      setNewReview({...newReview, rating})
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="review-content" className="block text-brown font-medium mb-2">Your Review</label>
                    <textarea
                      id="review-content"
                      placeholder="Share your experience in detail..."
                      value={newReview.content}
                      onChange={(e) => setNewReview({...newReview, content: e.target.value})}
                      rows={5}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all resize-none"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setShowAddReview(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddReview}
                    disabled={!newReview.content || !newReview.service}
                    className={`flex-1 px-4 py-3 bg-gradient-to-r from-gold to-yellow-500 text-white rounded-lg font-medium transition-all ${
                      !newReview.content || !newReview.service ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90 hover:shadow-md'
                    }`}
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
              <Filter size={16} className="text-brown" />
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm font-medium"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm font-medium"
              >
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rated</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="animate-pulse space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredReviews.length > 0 ? (
            <>
              <div className="space-y-6">
                {displayedReviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gold/30"
                      />
                      
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold text-charcoal">{review.name}</h4>
                            {review.verified && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                                Verified
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-brown">
                            <Calendar size={14} className="text-gold" />
                            {formatDate(review.date)}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <div className="flex">{renderStars(review.rating)}</div>
                          <span className="text-sm text-brown flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                            <Camera size={14} className="text-gold" />
                            {review.service}
                          </span>
                        </div>
                        
                        <p className="text-charcoal mb-4 leading-relaxed">{review.content}</p>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <button
                            onClick={() => review.id && handleHelpful(review.id)}
                            className={`flex items-center gap-1 transition-colors ${
                              localLikes[review.id!] ? 'text-red-500' : 'text-brown hover:text-red-500'
                            }`}
                          >
                            <Heart 
                              size={16} 
                              className={localLikes[review.id!] ? 'fill-current' : ''} 
                            />
                            Helpful ({review.helpful + (localLikes[review.id!] ? 1 : 0)})
                          </button>
                          <button className="flex items-center gap-1 text-brown hover:text-gold transition-colors">
                            <MessageCircle size={16} />
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {hasMoreReviews && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="bg-white border-2 border-gold text-gold px-8 py-3 rounded-lg hover:bg-gold hover:text-white transition-all duration-300 flex items-center mx-auto shadow-sm hover:shadow-md font-medium"
                  >
                    {showAllReviews ? (
                      <>
                        <ChevronUp size={20} className="mr-2" />
                        Show Less Reviews
                      </>
                    ) : (
                      <>
                        <ChevronDown size={20} className="mr-2" />
                        Show All Reviews ({filteredReviews.length - REVIEWS_TO_SHOW} more)
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
              <p className="text-brown text-lg">No reviews match your current filters.</p>
              <button
                onClick={() => {
                  setFilterRating('all');
                  setSortBy('latest');
                }}
                className="mt-4 text-gold hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RealtimeReviews;