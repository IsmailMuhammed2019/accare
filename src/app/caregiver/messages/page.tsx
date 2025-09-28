'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/supabase-auth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CaregiverLayout } from '@/components/caregiver/CaregiverLayout';
import { 
  MessageSquare,
  Send,
  Search,
  Phone,
  Video,
  MoreVertical,
  User,
  Clock,
  CheckCircle,
} from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  type: 'text' | 'image' | 'file';
}

interface Conversation {
  id: string;
  patientName: string;
  patientId: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

export default function CaregiverMessages() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'CAREGIVER') {
      router.push('/auth/login');
      return;
    }
    
    fetchConversations();
  }, [user, router]);

  const fetchConversations = async () => {
    try {
      setIsLoading(true);
      // Mock data for now
      const mockConversations: Conversation[] = [
        {
          id: '1',
          patientName: 'John Smith',
          patientId: 'patient-1',
          lastMessage: 'Thank you for the excellent care today!',
          lastMessageTime: '2024-01-15T14:30:00Z',
          unreadCount: 0,
          messages: [
            {
              id: '1',
              senderId: 'patient-1',
              senderName: 'John Smith',
              content: 'Hello! I\'m looking forward to our appointment tomorrow.',
              timestamp: '2024-01-15T10:00:00Z',
              isRead: true,
              type: 'text'
            },
            {
              id: '2',
              senderId: 'caregiver-1',
              senderName: 'You',
              content: 'Hello John! I\'m excited to meet you as well. I\'ll be there at 2 PM as scheduled.',
              timestamp: '2024-01-15T10:15:00Z',
              isRead: true,
              type: 'text'
            },
            {
              id: '3',
              senderId: 'patient-1',
              senderName: 'John Smith',
              content: 'Thank you for the excellent care today!',
              timestamp: '2024-01-15T14:30:00Z',
              isRead: true,
              type: 'text'
            }
          ]
        },
        {
          id: '2',
          patientName: 'Mary Johnson',
          patientId: 'patient-2',
          lastMessage: 'Could you please bring some groceries?',
          lastMessageTime: '2024-01-14T16:45:00Z',
          unreadCount: 2,
          messages: [
            {
              id: '4',
              senderId: 'patient-2',
              senderName: 'Mary Johnson',
              content: 'Could you please bring some groceries?',
              timestamp: '2024-01-14T16:45:00Z',
              isRead: false,
              type: 'text'
            }
          ]
        },
        {
          id: '3',
          patientName: 'Robert Brown',
          patientId: 'patient-3',
          lastMessage: 'See you tomorrow at 10 AM',
          lastMessageTime: '2024-01-13T18:20:00Z',
          unreadCount: 0,
          messages: [
            {
              id: '5',
              senderId: 'caregiver-1',
              senderName: 'You',
              content: 'See you tomorrow at 10 AM',
              timestamp: '2024-01-13T18:20:00Z',
              isRead: true,
              type: 'text'
            }
          ]
        }
      ];
      setConversations(mockConversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: user?.id || '',
      senderName: 'You',
      content: newMessage,
      timestamp: new Date().toISOString(),
      isRead: true,
      type: 'text'
    };

    setSelectedConversation(prev => {
      if (!prev) return null;
      return {
        ...prev,
        messages: [...prev.messages, message]
      };
    });

    setNewMessage('');
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  const totalUnreadCount = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <CaregiverLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">Messages</h1>
            <p className="text-primary/80">Communicate with your patients</p>
          </div>
          {totalUnreadCount > 0 && (
            <Badge variant="default" className="bg-red-500">
              {totalUnreadCount} unread
            </Badge>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
            {/* Conversations List */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Conversations</CardTitle>
                  <Button size="sm" variant="outline">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 border-b ${
                        selectedConversation?.id === conversation.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-sm truncate">{conversation.patientName}</h3>
                            {conversation.unreadCount > 0 && (
                              <Badge variant="default" className="bg-red-500">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 truncate">{conversation.lastMessage}</p>
                          <p className="text-xs text-gray-400">{formatDate(conversation.lastMessageTime)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Area */}
            <Card className="lg:col-span-2 flex flex-col">
              {selectedConversation ? (
                <>
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{selectedConversation.patientName}</CardTitle>
                          <CardDescription>Patient</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col p-0">
                    {/* Messages */}
                    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                      {selectedConversation.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.senderId === user?.id ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.senderId === user?.id
                                ? 'bg-gradient-primary text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.senderId === user?.id ? 'text-white/70' : 'text-gray-500'
                            }`}>
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="border-t p-4">
                      <div className="flex space-x-2">
                        <Textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1 min-h-[40px] max-h-32 resize-none"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                        <Button 
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                          className="bg-gradient-primary hover:shadow-colorful-lg"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-600">Choose a conversation to start messaging</p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    </CaregiverLayout>
  );
}
