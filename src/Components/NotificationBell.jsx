import { useQuery, gql } from '@apollo/client';
import { Bell } from 'lucide-react';
import { useContext, useState } from 'react';
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

const NotificationBell = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false); // dropdown open/close state

  const { data } = useQuery(GET_NOTIFICATIONS, {
    variables: { parentId: user?._id },
    skip: !user?._id,
    pollInterval: 5000, // auto-refresh every 5s
  });

  const notifications = data?.notificationsByParent || [];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="relative cursor-pointer" onClick={toggleDropdown}>
        <Bell className="w-6 h-6 text-orange-500" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-gray-700 text-xs rounded-full px-1">
            {unreadCount}
          </span>
        )}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-10">
          <ul className="p-2 max-h-60 overflow-y-auto">
            {notifications.length === 0 ? (
              <li className="text-sm text-gray-700">No notifications</li>
            ) : (
              notifications.map((n) => (
                <li key={n._id} className="py-1 text-sm border-b last:border-0">
                  {n.message}
                  <div className="text-xs text-gray-800">
                    {new Date(n.createdAt).toLocaleString()}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
