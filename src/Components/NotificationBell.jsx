import { useQuery, useMutation, gql } from '@apollo/client';
import { Bell, X } from 'lucide-react';
import { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../Components/Context/AuthContext';

const GET_NOTIFICATIONS = gql`
  query NotificationsByParent($parentId: ID!) {
    notificationsByParent(parentId: $parentId) {
      _id
      message
      isRead
      type
      createdAt
    }
  }
`;

const MARK_NOTIFICATIONS_READ = gql`
  mutation MarkNotificationsAsRead($parentId: ID!) {
    markNotificationsAsRead(parentId: $parentId) {
      success
      message
    }
  }
`;

const DELETE_READ_NOTIFICATIONS = gql`
  mutation DeleteReadNotifications($parentId: ID!) {
    deleteReadNotifications(parentId: $parentId) {
      success
      message
    }
  }
`;



const NotificationBell = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const dropdownRef = useRef(null);

  const { data, refetch } = useQuery(GET_NOTIFICATIONS, {
    variables: { parentId: user?._id },
    skip: !user?._id,
    pollInterval: 10000,//after 5 sec later it will appear the notification 
  });

  const [markAllAsRead] = useMutation(MARK_NOTIFICATIONS_READ, {
    onError: (error) => {
      console.error('Error marking notifications as read:', error);
    }
  });

  const [deleteReadNotifications] = useMutation(DELETE_READ_NOTIFICATIONS, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      console.error('Error deleting read notifications:', error);
    }
  });



  const notifications = data?.notificationsByParent || [];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Animation trigger for new notifications
  useEffect(() => {
    if (unreadCount > 0) {
      setHasNewNotifications(true);
      const timer = setTimeout(() => setHasNewNotifications(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [unreadCount]);

  // Dropdown close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    const willOpen = !isOpen;
    setIsOpen(willOpen);

    // If opening and there are unread notifications
    if (willOpen && unreadCount > 0) {
      markAllAsRead({ variables: { parentId: user?._id } }).then(() => {
        deleteReadNotifications({ variables: { parentId: user?._id } });
      });
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      markSingleAsRead({ variables: { notificationId: notification._id } });
    }
  };

const handleMarkAllAsRead = async () => {
  try {
    await markAllAsRead({ variables: { parentId: user?._id } });
    await deleteReadNotifications({ variables: { parentId: user?._id } });
    refetch(); // ⬅️ refresh notifications after deletion
  } catch (err) {
    console.error("Error marking or deleting notifications:", err);
  }
};


  const getNotificationIcon = (type) => {
    switch (type) {
      case 'message': return '💬';
      case 'alert': return '⚠️';
      case 'reminder': return '⏰';
      case 'success': return '✅';
      default: return '📢';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`relative p-2 rounded-full transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 ${
          isOpen ? 'bg-gray-100' : ''
        }`}
      >
        <Bell 
          className={`w-6 h-6 text-orange-500 transition-all duration-300 ${
            hasNewNotifications ? 'animate-bounce' : ''
          } ${isOpen ? 'rotate-12' : ''}`}
        />
        {unreadCount > 0 && (
          <span className={`absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-lg transform transition-all duration-300 ${
            hasNewNotifications ? 'animate-pulse scale-110' : ''
          }`}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
        {hasNewNotifications && (
          <div className="absolute inset-0 rounded-full bg-orange-500 opacity-20 animate-ping" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-white border-0 rounded-xl shadow-2xl z-50 transform transition-all duration-200 ease-out animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {unreadCount > 0 && (
            <div className="px-4 py-2 bg-orange-50 border-b border-orange-100">
              <p className="text-sm text-orange-700 font-medium">
                {unreadCount} new notification{unreadCount > 1 ? 's' : ''}
              </p>
            </div>
          )}

          <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <Bell className="w-12 h-12 text-gray-300 mb-3" />
                <p className="text-sm font-medium">No notifications yet</p>
                <p className="text-xs text-gray-400 mt-1">We'll notify you when something happens</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-50">
                {notifications.map((notification) => (
                  <li
                    key={notification._id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`p-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer ${
                      !notification.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm leading-relaxed ${
                          !notification.isRead ? 'font-medium text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-100 bg-gray-50">
              <button 
                onClick={handleMarkAllAsRead}
                className="w-full text-sm text-orange-600 hover:text-orange-700 font-medium py-2 px-4 rounded-lg hover:bg-orange-50 transition-colors duration-200"
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
