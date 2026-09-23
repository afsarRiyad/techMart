import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <AlertTriangle size={48} className="text-red-400 mb-4" />
          <h3 className="text-lg font-semibold text-tcolor dark:text-gray-100 mb-2">
            Something went wrong
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-md">
            {this.state.error?.message || 'An unexpected error occurred while loading this section.'}
          </p>
          <button
            onClick={this.handleRetry}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
