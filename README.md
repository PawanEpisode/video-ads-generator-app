# Frontend Documentation

## Overview

The frontend is built with React and provides a user-friendly interface for generating video ads from product URLs. It features a modern, responsive design with real-time progress tracking.

## Setup Instructions

### Prerequisites

1. **System Requirements**

   - Node.js 16.x or higher
   - npm 7.x or higher
   - Git
   - Modern web browser (Chrome, Firefox, Safari, Edge)

2. **Install Node.js**
   - **macOS**:
     ```bash
     brew install node
     ```
   - **Ubuntu/Debian**:
     ```bash
     curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
     sudo apt-get install -y nodejs
     ```
   - **Windows**:
     - Download from [Node.js official website](https://nodejs.org/)
     - Run the installer and follow the prompts

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/PawanEpisode/video-ads-generator-app.git
   cd video-ads-generator-app/frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   ```bash
   # Create .env file
   touch .env.local

   # Add the following variables to .env.local
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

### Running the Application

1. **Start the Development Server**

   ```bash
   npm run dev
   ```

2. **Verify Installation**
   - Open your browser and navigate to `http://localhost:3000`
   - You should see the application's main page
   - The page should be responsive and show the URL input form

### Common Issues and Solutions

1. **Port Already in Use**

   - Change the port number:
     ```bash
     npm run dev -- -p 3001
     ```

2. **Node Version Issues**

   - Check your Node.js version:
     ```bash
     node --version
     ```
   - If using an incompatible version, use nvm to switch:
     ```bash
     nvm install 16
     nvm use 16
     ```

3. **Dependency Issues**

   - Clear npm cache:
     ```bash
     npm cache clean --force
     ```
   - Delete node_modules and reinstall:
     ```bash
     rm -rf node_modules
     npm install
     ```

4. **API Connection Issues**
   - Ensure the backend server is running
   - Check the API URL in .env.local
   - Verify CORS settings in the backend

### Development Workflow

1. **Code Changes**

   - The development server will automatically reload
   - Check the browser console for any errors
   - Use React Developer Tools for debugging

2. **Building for Production**

   ```bash
   # Create production build
   npm run build

   # Start production server
   npm run start
   ```

3. **Testing**

   ```bash
   # Run unit tests
   npm test

   # Run tests with coverage
   npm test -- --coverage
   ```

4. **Linting and Formatting**

   ```bash
   # Run linter
   npm run lint

   # Format code
   npm run format
   ```

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Performance Optimization

1. **Development Mode**

   - Use React Developer Tools
   - Monitor component re-renders
   - Check network requests

2. **Production Mode**
   - Enable production build
   - Use browser dev tools
   - Monitor performance metrics

## Architecture

### Core Components

1. **UrlToVideo Component**

   - Main component for video generation
   - Handles URL input and validation
   - Manages video generation process
   - Displays progress and results

2. **VideoPlayer Component**
   - Handles video playback
   - Provides responsive video display
   - Manages video controls
   - Handles video loading states

### Key Features

1. **URL Processing**

   - URL validation
   - Progress tracking
   - Error handling
   - Status updates

2. **Video Display**

   - Responsive video container
   - Proper aspect ratio handling
   - Loading states
   - Error states

3. **User Interface**
   - Clean, modern design
   - Responsive layout
   - Progress indicators
   - Error messages

## Technical Details

### Component Structure

```jsx
// Main component structure
<UrlToVideo>
  <div className="container">
    <UrlInput />
    <ProgressIndicator />
    <VideoPlayer />
    <ErrorDisplay />
  </div>
</UrlToVideo>
```

### Key Components

1. **UrlInput**

   - Handles URL input
   - Validates input
   - Triggers video generation
   - Shows validation errors

2. **ProgressIndicator**

   - Shows generation progress
   - Displays status messages
   - Handles loading states
   - Shows error states

3. **VideoPlayer**
   - Displays generated video
   - Handles video controls
   - Manages video sizing
   - Shows loading states

## Styling

### Tailwind CSS Classes

1. **Container**

   ```jsx
   <div className="container mx-auto p-4">
   ```

2. **Video Container**

   ```jsx
   <div className="w-full h-full max-h-[600px]">
   ```

3. **Video Element**
   ```jsx
   <video className="w-full h-full object-contain rounded-lg">
   ```

### Responsive Design

1. **Mobile**

   - Full width container
   - Proper padding
   - Scrollable content

2. **Desktop**
   - Centered container
   - Max width constraints
   - Proper spacing

## API Integration

1. **Video Generation**

   ```javascript
   const response = await axios.post("/process", {
     url: productUrl,
   });
   ```

2. **Progress Tracking**

   ```javascript
   const progress = await axios.get(`/progress/${taskId}`);
   ```

3. **Error Handling**
   ```javascript
   try {
     // API calls
   } catch (error) {
     setError(error.message);
   }
   ```

## State Management

1. **URL State**

   ```javascript
   const [productUrl, setProductUrl] = useState("");
   ```

2. **Progress State**

   ```javascript
   const [progress, setProgress] = useState(0);
   ```

3. **Error State**
   ```javascript
   const [error, setError] = useState(null);
   ```

## Error Handling

1. **Input Validation**

   - URL format checking
   - Empty input handling
   - Invalid URL messages

2. **API Errors**

   - Network error handling
   - Server error handling
   - Timeout handling

3. **Video Errors**
   - Loading error handling
   - Playback error handling
   - Format error handling

## Performance

1. **Loading States**

   - Skeleton loaders
   - Progress indicators
   - Loading messages

2. **Error States**

   - Error messages
   - Retry options
   - Fallback content

3. **Video Optimization**
   - Lazy loading
   - Proper sizing
   - Format handling

## Testing

1. **Unit Tests**

   - Component rendering
   - State management
   - Event handling

2. **Integration Tests**
   - API integration
   - User interactions
   - Error scenarios

## Contributing

1. Follow React best practices
2. Use proper component structure
3. Implement error handling
4. Add proper documentation

## License

MIT License
