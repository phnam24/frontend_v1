# 🚀 E-Commerce Platform Frontend - Complete Vibecoding Prompt

## 📋 Project Overview
Build a modern, responsive e-commerce platform for selling laptops and mobile phones using **Next.js 14+** with App Router and **React 18+**. The platform should have a clean, professional UI with excellent UX, optimized performance, and full integration with existing backend APIs.

---

## 🎨 Design Requirements

### Visual Style
- **Modern & Clean**: Use a contemporary design with plenty of white space
- **Color Scheme**: 
  - Primary: Professional blue (#2563eb) or tech-inspired gradient
  - Secondary: Accent color for CTAs (#10b981)
  - Neutral: Grays for text and backgrounds
  - Semantic colors: Red for errors, Green for success, Yellow for warnings
- **Typography**: Inter or SF Pro for clean, readable text
- **Components**: Use shadcn/ui components with Tailwind CSS for consistency
- **Responsive**: Mobile-first approach, perfect on all screen sizes
- **Icons**: Lucide React for consistent iconography

### UX Principles
- Smooth animations and transitions (Framer Motion)
- Loading states and skeleton screens
- Toast notifications for user feedback
- Error boundaries for graceful error handling
- Optimistic UI updates where appropriate
- Accessibility (WCAG 2.1 AA compliant)

---

## 🏗️ Technical Architecture

### Project Structure
```
/src
├── app/                    # Next.js 14 App Router
│   ├── (auth)/            # Auth group: login, register
│   ├── (shop)/            # Main shop: products, cart, checkout
│   ├── (account)/         # User account: profile, orders, wishlist
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Header, Footer, Navigation
│   ├── products/          # Product cards, filters, etc.
│   ├── cart/              # Cart components
│   └── common/            # Reusable components
├── lib/
│   ├── api/               # API client functions
│   ├── hooks/             # Custom React hooks
│   ├── store/             # State management (Zustand)
│   ├── utils/             # Helper functions
│   └── constants.ts       # App constants
├── types/                 # TypeScript types
└── styles/                # Global styles
```

### Tech Stack
- **Framework**: Next.js 14+ (App Router, Server Components, Server Actions)
- **UI Library**: React 18+
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand (lightweight, simple)
- **Data Fetching**: React Query (TanStack Query) for caching and optimistic updates
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios with interceptors
- **Animations**: Framer Motion
- **Date Handling**: date-fns
- **Icons**: Lucide React

---

## 🔌 API Integration

### Base Configuration
```typescript
// lib/api/client.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.yourbackend.com'

// Setup Axios with interceptors for:
// - Auto-attach access token from localStorage/cookies
// - Auto-refresh token on 401
// - Global error handling
// - Request/response logging in dev mode
```

### Authentication Flow
- Store `accessToken` and `refreshToken` securely (httpOnly cookies preferred, or localStorage)
- Implement auto token refresh before expiry
- Redirect to login on auth failure
- Clear tokens on logout

### API Services Structure
Create separate service files for each domain:
- `auth.service.ts` - Login, Register, Logout, Refresh Token, Get My Info
- `user.service.ts` - Profile CRUD, Address Management, Change Password
- `product.service.ts` - Products list/search/filter, Categories, Brands, Variants
- `cart.service.ts` - Cart CRUD operations
- `order.service.ts` - Order creation, history, details, cancellation
- `review.service.ts` - Reviews CRUD
- `wishlist.service.ts` - Wishlist operations
- `notification.service.ts` - Notifications list, mark as read

---

## 🎯 Core Features Implementation

### 1. 🔐 Authentication & User Management

#### Pages Needed
- `/login` - Login form with email/password
- `/register` - Registration form with validation
- `/profile` - User profile view/edit
- `/profile/addresses` - Address management
- `/profile/security` - Change password

#### Key Components
- `<LoginForm />` - Email/password with validation, "Remember me", "Forgot password" link
- `<RegisterForm />` - Full registration with terms acceptance
- `<ProfileForm />` - Editable profile fields
- `<AddressManager />` - List addresses, add/edit/delete, set default
- `<ChangePasswordForm />` - Current + new password with strength indicator

#### State Management
```typescript
// lib/store/auth.store.ts
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  refreshToken: () => Promise<void>
}
```

---

### 2. 🛍️ Product Management

#### Pages Needed
- `/products` - Product listing with filters/search
- `/products/[slug]` - Product detail page
- `/categories/[slug]` - Products by category
- `/brands/[slug]` - Products by brand
- `/search` - Search results page

#### Key Components
- `<ProductGrid />` - Responsive grid of product cards
- `<ProductCard />` - Image, name, price, rating, wishlist button, quick view
- `<ProductFilters />` - Category, brand, price range, rating filters
- `<ProductDetail />` - Full product info, image gallery, variant selector
- `<VariantSelector />` - Color/size/spec selector with stock info
- `<SearchBar />` - Autocomplete search with suggestions
- `<CategoryNav />` - Hierarchical category navigation

#### Features
- **Infinite scroll** or pagination for product lists
- **Filter sidebar** with active filter chips
- **Sort options**: Price (low-high), Rating, Newest, Popular
- **Image gallery** with zoom and thumbnails
- **Stock indicator**: In stock, Low stock, Out of stock
- **Breadcrumbs** for navigation context

---

### 3. 🛒 Cart Management

#### Pages Needed
- `/cart` - Full cart page
- Mini cart (drawer/modal) - Quick cart view from header

#### Key Components
- `<CartDrawer />` - Slide-out mini cart
- `<CartPage />` - Full cart with item list
- `<CartItem />` - Product image, name, variant, quantity selector, remove button
- `<CartSummary />` - Subtotal, shipping estimate, total, checkout button

#### State Management
```typescript
// lib/store/cart.store.ts
interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  addItem: (productId: string, variantId: string, quantity: number) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  removeItem: (itemId: string) => Promise<void>
  clearCart: () => Promise<void>
}
```

#### Features
- **Optimistic updates** for quantity changes
- **Stock validation** when changing quantity
- **Save for later** option
- **Related products** suggestions
- **Cart badge** in header with item count

---

### 4. 📦 Order Management

#### Pages Needed
- `/checkout` - Multi-step checkout process
- `/orders` - Order history list
- `/orders/[orderId]` - Order details
- `/order-success` - Order confirmation page

#### Key Components
- `<CheckoutStepper />` - Visual progress indicator (Address → Payment → Review)
- `<AddressStep />` - Select/add delivery address
- `<PaymentStep />` - Payment method selection
- `<OrderReview />` - Final review before placing order
- `<OrderList />` - Paginated order history
- `<OrderCard />` - Order summary card with status
- `<OrderDetails />` - Full order breakdown with timeline

#### Features
- **Order statuses**: Pending, Processing, Shipped, Delivered, Cancelled
- **Order timeline** with status updates
- **Cancel order** option (if status allows)
- **Reorder** functionality
- **Order tracking** integration (if available)
- **Download invoice** option

---

### 5. ⭐ Reviews & Ratings

#### Key Components
- `<ReviewSection />` - All reviews for a product
- `<ReviewForm />` - Star rating + text review
- `<ReviewCard />` - Individual review display
- `<RatingFilter />` - Filter by star rating
- `<RatingSummary />` - Average rating + distribution graph

#### Features
- **Only purchased users** can review
- **Edit/delete own reviews**
- **Helpful votes** on reviews
- **Image uploads** in reviews (if supported)
- **Verified purchase** badge

---

### 6. ❤️ Wishlist

#### Pages Needed
- `/wishlist` - Full wishlist page

#### Key Components
- `<WishlistButton />` - Heart icon toggle button
- `<WishlistGrid />` - Grid of wishlisted products
- `<WishlistItem />` - Similar to ProductCard with "Add to Cart" and "Remove"

#### Features
- **Quick add to cart** from wishlist
- **Stock notifications** for out-of-stock items
- **Share wishlist** functionality
- **Move to cart** bulk action

---

### 7. 🔔 Notifications

#### Key Components
- `<NotificationBell />` - Header icon with unread count badge
- `<NotificationDropdown />` - Quick view of recent notifications
- `<NotificationList />` - Full list on separate page (optional)
- `<NotificationItem />` - Individual notification with icon, message, timestamp

#### Features
- **Real-time updates** (polling or WebSocket)
- **Mark as read** on click
- **Mark all as read** action
- **Notification types**: Order updates, Promotions, Account alerts
- **Toast notifications** for important updates

---

## 🎨 Key UI/UX Features

### Global Features
1. **Header**
   - Logo, Search bar, Navigation (Products, Categories, Brands)
   - User menu (Profile, Orders, Wishlist, Logout)
   - Cart icon with count badge
   - Notification bell with count badge

2. **Footer**
   - Links: About, Contact, FAQ, Terms, Privacy
   - Newsletter signup
   - Social media links
   - Payment method icons

3. **Loading States**
   - Skeleton screens for content loading
   - Button spinners for actions
   - Page transition animations

4. **Error Handling**
   - Error boundaries for component crashes
   - Friendly error messages
   - Retry buttons
   - 404 page for not found
   - Network error handling

5. **Accessibility**
   - Keyboard navigation
   - ARIA labels
   - Focus indicators
   - Screen reader support
   - Color contrast compliance

---

## 📱 Responsive Design

- **Mobile** (< 640px): Stacked layout, hamburger menu, bottom navigation
- **Tablet** (640px - 1024px): 2-column grids, collapsible sidebar
- **Desktop** (> 1024px): Full layout with sidebar filters, multi-column grids

---

## ⚡ Performance Optimization

1. **Image Optimization**: Use Next.js Image component with lazy loading
2. **Code Splitting**: Dynamic imports for heavy components
3. **Caching Strategy**: React Query for API response caching
4. **SEO**: Server-side rendering for product pages, proper meta tags
5. **Analytics**: Track user interactions, conversions, errors

---

## 🔒 Security Best Practices

- Sanitize user inputs
- Implement CSRF protection
- Use HTTPS only
- Secure token storage
- Rate limiting on API calls
- Content Security Policy headers

---

## 📦 Environment Variables

```env
NEXT_PUBLIC_API_URL=https://api.yourbackend.com
NEXT_PUBLIC_APP_URL=https://yourfrontend.com
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
```

---

## 🚀 Getting Started Instructions for AI

1. **Initialize Project**: Set up Next.js 14 with TypeScript, Tailwind CSS, and shadcn/ui
2. **Create folder structure** as outlined above
3. **Install dependencies**: Zustand, React Query, Axios, React Hook Form, Zod, Framer Motion, date-fns, Lucide React
4. **Setup API client** with authentication interceptors
5. **Create Zustand stores** for auth and cart
6. **Build authentication flow** first (login, register, logout, protected routes)
7. **Implement product listing** with filters and search
8. **Build cart functionality** with optimistic updates
9. **Create checkout flow** with multi-step process
10. **Add remaining features**: Orders, Reviews, Wishlist, Notifications
11. **Polish UI/UX** with animations, loading states, error handling
12. **Test responsiveness** across all screen sizes
13. **Add SEO optimizations** and meta tags

---

## 🎯 Success Criteria

- ✅ All API endpoints integrated and working
- ✅ Smooth, intuitive user experience
- ✅ Fast page loads (< 3s)
- ✅ Mobile-responsive design
- ✅ Proper error handling and validation
- ✅ Secure authentication flow
- ✅ Shopping cart persists across sessions
- ✅ Search and filters work perfectly
- ✅ Clean, maintainable code structure

---

## 📅 Development Phases & Task Breakdown

### 🎯 Phase 1: Foundation & Setup (Week 1)
**Goal**: Set up project infrastructure and basic navigation

#### Tasks:
- [ ] Initialize Next.js 14 project with TypeScript
- [ ] Configure Tailwind CSS and install shadcn/ui
- [ ] Set up project folder structure
- [ ] Install all dependencies (Zustand, React Query, Axios, etc.)
- [ ] Configure environment variables
- [ ] Set up ESLint and Prettier
- [ ] Create basic layout components (Header, Footer, Navigation)
- [ ] Implement responsive navigation with mobile menu
- [ ] Set up routing structure for all main pages
- [ ] Create 404 and error pages
- [ ] Set up Axios client with interceptors
- [ ] Configure React Query provider

**Deliverables**:
- ✅ Working project structure
- ✅ Responsive header/footer
- ✅ Basic navigation between pages
- ✅ API client ready for integration

---

### 🔐 Phase 2: Authentication & User Management (Week 1-2)
**Goal**: Complete user authentication and profile management

#### Tasks:
- [ ] Create auth Zustand store
- [ ] Implement login page with form validation
- [ ] Implement register page with form validation
- [ ] Add "Forgot Password" UI (if API supports)
- [ ] Implement token storage and refresh mechanism
- [ ] Create protected route wrapper/middleware
- [ ] Add logout functionality
- [ ] Create profile page (view/edit)
- [ ] Implement address management (CRUD)
- [ ] Add change password functionality
- [ ] Create auth guards for protected pages
- [ ] Add loading states and error handling
- [ ] Implement "Remember Me" functionality

**Deliverables**:
- ✅ Users can register and login
- ✅ Token refresh works automatically
- ✅ Profile management fully functional
- ✅ Address book working
- ✅ Protected routes redirect to login

---

### 🛍️ Phase 3: Product Catalog & Search (Week 2-3)
**Goal**: Build complete product browsing experience

#### Tasks:
- [ ] Create product service with all API calls
- [ ] Design and implement product card component
- [ ] Create product grid with responsive layout
- [ ] Implement product listing page with pagination/infinite scroll
- [ ] Add product filters (category, brand, price, rating)
- [ ] Create filter sidebar with active filter chips
- [ ] Implement sort functionality
- [ ] Build search bar with autocomplete
- [ ] Create search results page
- [ ] Implement product detail page
- [ ] Add image gallery with zoom functionality
- [ ] Create variant selector component
- [ ] Add stock indicators
- [ ] Implement breadcrumb navigation
- [ ] Create category and brand pages
- [ ] Add product skeleton loading states
- [ ] Implement SEO meta tags for products

**Deliverables**:
- ✅ Product browsing fully functional
- ✅ Search and filters working perfectly
- ✅ Product details page complete
- ✅ Variant selection working
- ✅ Mobile responsive product catalog

---

### 🛒 Phase 4: Shopping Cart (Week 3-4)
**Goal**: Complete cart functionality with optimistic updates

#### Tasks:
- [ ] Create cart Zustand store
- [ ] Implement cart service with API integration
- [ ] Create cart drawer/modal component
- [ ] Build full cart page
- [ ] Implement add to cart functionality
- [ ] Add quantity update with stock validation
- [ ] Create remove from cart feature
- [ ] Add cart badge in header
- [ ] Implement cart summary component
- [ ] Add optimistic UI updates
- [ ] Create empty cart state
- [ ] Add cart item validation (stock, availability)
- [ ] Implement cart persistence
- [ ] Add "Continue Shopping" functionality
- [ ] Create related products section in cart
- [ ] Add loading states and error handling

**Deliverables**:
- ✅ Fully functional shopping cart
- ✅ Cart persists across sessions
- ✅ Smooth add/remove/update operations
- ✅ Stock validation working
- ✅ Cart accessible from anywhere

---

### 📦 Phase 5: Checkout & Orders (Week 4-5)
**Goal**: Complete order placement and management

#### Tasks:
- [ ] Create order service with API integration
- [ ] Design checkout flow (multi-step)
- [ ] Implement checkout stepper component
- [ ] Create address selection/add in checkout
- [ ] Build payment method selection (if applicable)
- [ ] Implement order review step
- [ ] Add order placement functionality
- [ ] Create order success page
- [ ] Build order history page
- [ ] Implement order details page
- [ ] Add order status tracking
- [ ] Create order timeline component
- [ ] Implement cancel order functionality
- [ ] Add reorder feature
- [ ] Create invoice download (if supported)
- [ ] Add order filters and search
- [ ] Implement order pagination

**Deliverables**:
- ✅ Complete checkout process working
- ✅ Orders can be placed successfully
- ✅ Order history accessible
- ✅ Order details and tracking functional
- ✅ Order management complete

---

### ⭐ Phase 6: Reviews & Ratings (Week 5)
**Goal**: Enable product reviews and ratings

#### Tasks:
- [ ] Create review service with API integration
- [ ] Implement review section on product page
- [ ] Create rating summary component with distribution
- [ ] Build review form with star rating
- [ ] Add review submission functionality
- [ ] Implement review list with pagination
- [ ] Create review card component
- [ ] Add edit/delete own reviews
- [ ] Implement review filters (by rating)
- [ ] Add verified purchase badge
- [ ] Create review images (if supported)
- [ ] Add helpful votes functionality (if supported)
- [ ] Implement review validation rules
- [ ] Add empty state for no reviews

**Deliverables**:
- ✅ Users can read product reviews
- ✅ Purchased users can write reviews
- ✅ Review editing/deletion works
- ✅ Rating system functional
- ✅ Review filtering implemented

---

### ❤️ Phase 7: Wishlist (Week 6)
**Goal**: Complete wishlist functionality

#### Tasks:
- [ ] Create wishlist service with API integration
- [ ] Implement wishlist button (heart icon)
- [ ] Add toggle wishlist functionality
- [ ] Create wishlist page
- [ ] Build wishlist grid component
- [ ] Implement add to cart from wishlist
- [ ] Add remove from wishlist
- [ ] Create empty wishlist state
- [ ] Add wishlist count badge (if needed)
- [ ] Implement stock notifications for wishlist items
- [ ] Add move to cart bulk action
- [ ] Create share wishlist feature (if supported)
- [ ] Sync wishlist state across components

**Deliverables**:
- ✅ Wishlist fully functional
- ✅ Users can save favorite products
- ✅ Quick add to cart from wishlist
- ✅ Wishlist accessible from anywhere

---

### 🔔 Phase 8: Notifications (Week 6)
**Goal**: Implement notification system

#### Tasks:
- [ ] Create notification service with API integration
- [ ] Implement notification bell in header
- [ ] Add unread count badge
- [ ] Create notification dropdown
- [ ] Build notification item component
- [ ] Implement mark as read functionality
- [ ] Add mark all as read
- [ ] Create notification types with icons
- [ ] Implement notification polling/real-time updates
- [ ] Add toast notifications for important events
- [ ] Create notification page (optional)
- [ ] Implement notification filters by type
- [ ] Add notification sound (optional)
- [ ] Create notification preferences (optional)

**Deliverables**:
- ✅ Notification system working
- ✅ Users receive order updates
- ✅ Notification dropdown functional
- ✅ Toast notifications appearing

---

### 🎨 Phase 9: UI/UX Polish & Enhancement (Week 7)
**Goal**: Polish user experience and add animations

#### Tasks:
- [ ] Add Framer Motion animations throughout
- [ ] Implement skeleton loading states everywhere
- [ ] Add page transition animations
- [ ] Create hover effects on interactive elements
- [ ] Implement toast notification system
- [ ] Add form validation feedback animations
- [ ] Create smooth scroll behaviors
- [ ] Implement image lazy loading optimization
- [ ] Add micro-interactions (button clicks, etc.)
- [ ] Create beautiful empty states
- [ ] Implement progress indicators
- [ ] Add confirmation dialogs for destructive actions
- [ ] Create 3D product card effects (optional)
- [ ] Add dark mode support (optional)
- [ ] Implement accessibility improvements (ARIA labels, keyboard nav)

**Deliverables**:
- ✅ Smooth, polished user experience
- ✅ Beautiful animations throughout
- ✅ Professional loading states
- ✅ Accessible interface

---

### 🚀 Phase 10: Performance & SEO (Week 7-8)
**Goal**: Optimize performance and search engine visibility

#### Tasks:
- [ ] Optimize images with Next.js Image component
- [ ] Implement code splitting for heavy components
- [ ] Configure React Query caching strategies
- [ ] Add SEO meta tags to all pages
- [ ] Create dynamic sitemap
- [ ] Implement robots.txt
- [ ] Add Open Graph tags for social sharing
- [ ] Optimize bundle size
- [ ] Implement lazy loading for below-fold content
- [ ] Add analytics tracking (Google Analytics)
- [ ] Create performance monitoring
- [ ] Implement error tracking (Sentry, optional)
- [ ] Optimize API calls (batching, deduplication)
- [ ] Add service worker for offline support (optional)
- [ ] Implement image optimization and WebP support

**Deliverables**:
- ✅ Fast page load times (< 3s)
- ✅ Good Lighthouse scores (90+)
- ✅ SEO optimized
- ✅ Analytics tracking working

---

### 🧪 Phase 11: Testing & Bug Fixes (Week 8)
**Goal**: Ensure quality and fix issues

#### Tasks:
- [ ] Test all user flows end-to-end
- [ ] Test responsive design on multiple devices
- [ ] Test cross-browser compatibility
- [ ] Fix cart edge cases (out of stock, etc.)
- [ ] Test form validations thoroughly
- [ ] Test authentication edge cases
- [ ] Verify error handling everywhere
- [ ] Test API error scenarios
- [ ] Fix any UI/UX inconsistencies
- [ ] Test accessibility with screen readers
- [ ] Verify all loading states work
- [ ] Test payment flow thoroughly (if applicable)
- [ ] Verify order flow from cart to confirmation
- [ ] Test notification system reliability
- [ ] Create bug tracking and fix list

**Deliverables**:
- ✅ All critical bugs fixed
- ✅ Stable, production-ready application
- ✅ Smooth user experience
- ✅ Cross-browser compatible

---

### 📱 Phase 12: Mobile App Features (Optional - Week 9)
**Goal**: Add mobile-specific enhancements

#### Tasks:
- [ ] Implement bottom navigation for mobile
- [ ] Add pull-to-refresh functionality
- [ ] Create mobile-optimized filters (drawer style)
- [ ] Implement swipe gestures for product images
- [ ] Add haptic feedback (if supported)
- [ ] Create app-like navigation transitions
- [ ] Implement mobile search with recent searches
- [ ] Add quick actions (share, favorite)
- [ ] Create mobile-optimized checkout flow
- [ ] Implement biometric authentication (if supported)

**Deliverables**:
- ✅ App-like mobile experience
- ✅ Mobile-specific features working
- ✅ Excellent mobile UX

---

### 🎁 Phase 13: Advanced Features (Optional - Week 9-10)
**Goal**: Add nice-to-have features

#### Tasks:
- [ ] Implement product comparison feature
- [ ] Add recently viewed products
- [ ] Create product recommendations
- [ ] Implement coupon/promo code system
- [ ] Add gift card support (if API supports)
- [ ] Create referral program UI (if supported)
- [ ] Implement social login (Google, Facebook)
- [ ] Add live chat support widget
- [ ] Create FAQ and help center
- [ ] Implement newsletter subscription
- [ ] Add blog or content section
- [ ] Create loyalty points system (if supported)
- [ ] Implement A/B testing framework
- [ ] Add personalization features

**Deliverables**:
- ✅ Enhanced shopping experience
- ✅ Additional value-add features
- ✅ Competitive advantages

---

## 📊 Phase Completion Checklist

After each phase, verify:
- [ ] All tasks completed
- [ ] Features tested on desktop, tablet, mobile
- [ ] API integration working correctly
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] UI/UX polished
- [ ] Code reviewed and refactored
- [ ] Documentation updated
- [ ] Git commits pushed

---

## 🎯 Success Metrics by Phase

### Phase 1-2: Foundation
- Project runs without errors
- User can navigate all pages
- Authentication works end-to-end

### Phase 3-4: Core Shopping
- Product browsing is smooth
- Search returns relevant results
- Cart operations are instant

### Phase 5-6: Transactions
- Checkout process is intuitive
- Orders are placed successfully
- Reviews can be submitted

### Phase 7-8: Engagement
- Wishlist saves across sessions
- Notifications appear in real-time
- Users stay engaged

### Phase 9-10: Quality
- Lighthouse score > 90
- No console errors
- Fast load times

### Phase 11-13: Excellence
- Zero critical bugs
- Excellent mobile experience
- Advanced features delight users

---

**Start by creating the project structure, then build feature by feature, testing each thoroughly before moving to the next. Focus on core shopping experience first (browse, add to cart, checkout), then add enhancement features (wishlist, reviews, notifications).**