'use client';

import { useState, useEffect } from 'react';
import { Search, FileText, Folder, MoreVertical, Grid, List, Upload, Plus, Star, Clock, Users, Download, Share2, Eye, Edit3, Trash2, Mail, Lock, User, LogOut, ArrowLeft } from 'lucide-react';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showProviderLogin, setShowProviderLogin] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [currentUser, setCurrentUser] = useState<{name: string, email: string, provider: string} | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Email providers configuration
  const emailProviders = [
    {
      id: 'office365',
      name: 'Office 365',
      domain: '@outlook.com',
      color: 'from-blue-600 to-blue-700',
      hoverColor: 'hover:from-blue-700 hover:to-blue-800',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Microsoft_Office_logo_%282019%E2%80%93present%29.svg/512px-Microsoft_Office_logo_%282019%E2%80%93present%29.svg.png'
    },
    {
      id: 'outlook',
      name: 'Outlook',
      domain: '@outlook.com',
      color: 'from-blue-500 to-indigo-600',
      hoverColor: 'hover:from-blue-600 hover:to-indigo-700',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg/512px-Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg.png'
    },
    {
      id: 'gmail',
      name: 'Gmail',
      domain: '@gmail.com',
      color: 'from-red-500 to-red-600',
      hoverColor: 'hover:from-red-600 hover:to-red-700',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/512px-Gmail_icon_%282020%29.svg.png'
    },
    {
      id: 'yahoo',
      name: 'Yahoo Mail',
      domain: '@yahoo.com',
      color: 'from-purple-600 to-purple-700',
      hoverColor: 'hover:from-purple-700 hover:to-purple-800',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Yahoo%21_%282019%29.svg/512px-Yahoo%21_%282019%29.svg.png'
    },
    {
      id: 'other',
      name: 'Other Provider',
      domain: '',
      color: 'from-gray-600 to-gray-700',
      hoverColor: 'hover:from-gray-700 hover:to-gray-800',
      logo: null
    }
  ];

  // Handle provider selection
  const handleProviderSelect = (provider: any) => {
    setSelectedProvider(provider.id);
    setShowProviderLogin(true);
    if (provider.id !== 'other') {
      setLoginForm(prev => ({ ...prev, email: provider.domain }));
    } else {
      setLoginForm(prev => ({ ...prev, email: '' }));
    }
  };

  // Mock authentication function
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock validation
    if (loginForm.email && loginForm.password) {
      const provider = emailProviders.find(p => p.id === selectedProvider);
      setCurrentUser({
        name: loginForm.email.split('@')[0],
        email: loginForm.email,
        provider: provider?.name || 'Email'
      });
      setIsAuthenticated(true);
    }
    
    setIsLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setSelectedProvider(null);
    setShowProviderLogin(false);
    setLoginForm({ email: '', password: '' });
  };

  const handleBackToProviders = () => {
    setShowProviderLogin(false);
    setSelectedProvider(null);
    setLoginForm({ email: '', password: '' });
  };

  // Mock data for documents
  const documents = [
    {
      id: '1',
      name: 'Project Proposal.pdf',
      type: 'pdf',
      size: '2.4 MB',
      modified: '2 hours ago',
      owner: 'John Doe',
      starred: true,
      thumbnail: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      name: 'Design System.sketch',
      type: 'sketch',
      size: '15.2 MB',
      modified: '1 day ago',
      owner: 'Sarah Wilson',
      starred: false,
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      name: 'Marketing Campaign',
      type: 'folder',
      size: '12 items',
      modified: '3 days ago',
      owner: 'Mike Johnson',
      starred: true,
      thumbnail: null
    },
    {
      id: '4',
      name: 'Brand Guidelines.ai',
      type: 'illustrator',
      size: '8.7 MB',
      modified: '1 week ago',
      owner: 'Emma Davis',
      starred: false,
      thumbnail: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '5',
      name: 'Website Mockup.psd',
      type: 'photoshop',
      size: '45.1 MB',
      modified: '2 weeks ago',
      owner: 'Alex Chen',
      starred: true,
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '6',
      name: 'Video Assets',
      type: 'folder',
      size: '8 items',
      modified: '1 month ago',
      owner: 'Lisa Park',
      starred: false,
      thumbnail: null
    }
  ];

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'folder':
        return <Folder className="w-8 h-8 text-blue-500" />;
      case 'pdf':
        return <FileText className="w-8 h-8 text-red-500" />;
      case 'sketch':
        return <FileText className="w-8 h-8 text-orange-500" />;
      case 'illustrator':
        return <FileText className="w-8 h-8 text-orange-600" />;
      case 'photoshop':
        return <FileText className="w-8 h-8 text-blue-600" />;
      default:
        return <FileText className="w-8 h-8 text-gray-500" />;
    }
  };

  // Authentication UI
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Adobe Cloud</h1>
            <p className="text-gray-600">Sign in with your email provider</p>
          </div>

          {/* Auth Container */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200/50 shadow-xl overflow-hidden">
            {!showProviderLogin ? (
              /* Provider Selection */
              <div className="p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                  Choose your email provider
                </h2>
                
                <div className="grid grid-cols-1 gap-3">
                  {emailProviders.map((provider) => (
                    <button
                      key={provider.id}
                      onClick={() => handleProviderSelect(provider)}
                      className={`w-full flex items-center space-x-4 p-4 bg-gradient-to-r ${provider.color} ${provider.hoverColor} text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg group`}
                    >
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        {provider.logo ? (
                          <img 
                            src={provider.logo} 
                            alt={provider.name}
                            className="w-5 h-5 object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling!.style.display = 'block';
                            }}
                          />
                        ) : null}
                        <Mail className={`w-5 h-5 ${provider.logo ? 'hidden' : 'block'}`} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium">{provider.name}</div>
                        <div className="text-sm text-white/80">
                          {provider.id === 'other' ? 'Enter your email address' : provider.domain}
                        </div>
                      </div>
                      <div className="w-6 h-6 border-2 border-white/30 rounded-full flex items-center justify-center group-hover:border-white/50 transition-colors duration-200">
                        <div className="w-2 h-2 bg-white/0 group-hover:bg-white/80 rounded-full transition-all duration-200"></div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    Secure authentication powered by industry standards
                  </p>
                </div>
              </div>
            ) : (
              /* Login Form */
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <button
                    onClick={handleBackToProviders}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-lg transition-all duration-200 mr-3"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      {emailProviders.find(p => p.id === selectedProvider)?.logo ? (
                        <img 
                          src={emailProviders.find(p => p.id === selectedProvider)?.logo!} 
                          alt="Provider"
                          className="w-5 h-5 object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling!.style.display = 'block';
                          }}
                        />
                      ) : null}
                      <Mail className={`w-5 h-5 text-gray-600 ${emailProviders.find(p => p.id === selectedProvider)?.logo ? 'hidden' : 'block'}`} />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {emailProviders.find(p => p.id === selectedProvider)?.name}
                      </h2>
                      <p className="text-sm text-gray-500">Sign in to continue</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        required
                        value={loginForm.email}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-200"
                        placeholder={
                          selectedProvider === 'other' 
                            ? 'Enter your email address'
                            : `Enter your ${emailProviders.find(p => p.id === selectedProvider)?.name} email`
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="password"
                        required
                        value={loginForm.password}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-200"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 text-gray-600">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span>Remember me</span>
                    </label>
                    <button type="button" className="text-blue-600 hover:text-blue-700 transition-colors duration-200">
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 bg-gradient-to-r ${emailProviders.find(p => p.id === selectedProvider)?.color} text-white rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      `Sign in with ${emailProviders.find(p => p.id === selectedProvider)?.name}`
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    Protected by enterprise-grade security
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Main Application UI (after authentication)
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Adobe Cloud</h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search files and folders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100/50 border border-gray-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-200"
                />
              </div>
            </div>

            {/* Action Buttons and User Menu */}
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-lg transition-all duration-200">
                <Upload className="w-5 h-5" />
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>New</span>
              </button>
              
              {/* User Menu */}
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-lg transition-all duration-200">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {currentUser?.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-56 bg-white/90 backdrop-blur-md rounded-lg border border-gray-200/50 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-4 border-b border-gray-100">
                    <p className="font-medium text-gray-900">{currentUser?.name}</p>
                    <p className="text-sm text-gray-500">{currentUser?.email}</p>
                    <p className="text-xs text-blue-600 mt-1">via {currentUser?.provider}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-900">My Files</h2>
            <span className="text-sm text-gray-500">
              {filteredDocuments.length} items
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {/* View Toggle */}
            <div className="flex items-center bg-gray-100/50 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* File Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="group bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 p-4 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer"
                onClick={() => toggleItemSelection(doc.id)}
              >
                {/* Thumbnail */}
                <div className="aspect-square rounded-lg mb-4 overflow-hidden bg-gray-100/50 flex items-center justify-center relative">
                  {doc.thumbnail ? (
                    <img
                      src={doc.thumbnail}
                      alt={doc.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    getFileIcon(doc.type)
                  )}
                  
                  {/* Selection Checkbox */}
                  <div className={`absolute top-2 left-2 w-5 h-5 rounded border-2 transition-all duration-200 ${
                    selectedItems.includes(doc.id)
                      ? 'bg-blue-600 border-blue-600'
                      : 'bg-white/80 border-gray-300 group-hover:border-blue-400'
                  }`}>
                    {selectedItems.includes(doc.id) && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>

                  {/* Star */}
                  {doc.starred && (
                    <div className="absolute top-2 right-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    </div>
                  )}

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                      <button className="p-2 bg-white/90 rounded-lg hover:bg-white transition-all duration-200">
                        <Eye className="w-4 h-4 text-gray-700" />
                      </button>
                      <button className="p-2 bg-white/90 rounded-lg hover:bg-white transition-all duration-200">
                        <Share2 className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* File Info */}
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-200">
                    {doc.name}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{doc.size}</span>
                    <span>{doc.modified}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <Users className="w-3 h-3" />
                    <span>{doc.owner}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200/50 text-sm font-medium text-gray-600">
              <div className="col-span-1"></div>
              <div className="col-span-5">Name</div>
              <div className="col-span-2">Owner</div>
              <div className="col-span-2">Modified</div>
              <div className="col-span-1">Size</div>
              <div className="col-span-1"></div>
            </div>
            
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50/50 transition-all duration-200 cursor-pointer border-b border-gray-100/50 last:border-b-0"
                onClick={() => toggleItemSelection(doc.id)}
              >
                <div className="col-span-1 flex items-center">
                  <div className={`w-4 h-4 rounded border-2 transition-all duration-200 ${
                    selectedItems.includes(doc.id)
                      ? 'bg-blue-600 border-blue-600'
                      : 'bg-white border-gray-300'
                  }`}>
                    {selectedItems.includes(doc.id) && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="col-span-5 flex items-center space-x-3">
                  {getFileIcon(doc.type)}
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{doc.name}</span>
                    {doc.starred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                  </div>
                </div>
                
                <div className="col-span-2 flex items-center text-sm text-gray-600">
                  {doc.owner}
                </div>
                
                <div className="col-span-2 flex items-center text-sm text-gray-600">
                  {doc.modified}
                </div>
                
                <div className="col-span-1 flex items-center text-sm text-gray-600">
                  {doc.size}
                </div>
                
                <div className="col-span-1 flex items-center justify-end">
                  <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
            <p className="text-gray-500">Try adjusting your search query or upload some files.</p>
          </div>
        )}
      </main>

      {/* Selection Actions Bar */}
      {selectedItems.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md rounded-xl border border-gray-200/50 shadow-lg px-6 py-3">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">
              {selectedItems.length} selected
            </span>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                <Edit3 className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => setSelectedItems([])}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}