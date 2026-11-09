import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNotification,
  getNotifications,
  markAllAsRead,
  markAsRead,
} from "../../store/slices/notificationSlice";
import {
  AlertCircle,
  BadgeCheck,
  BellOff,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Clock5,
  MessageCircle,
  Settings,
  User,
} from "lucide-react";

const NotificationsPage = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notification.list);
  const unreadCount = useSelector((state) => state.notification.unreadCount);

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const markAsReadHandler = (id) => dispatch(markAsRead(id));
  const markAllAsReadHandler = () => dispatch(markAllAsRead());
  const deleteNotificationHandler = (id) => dispatch(deleteNotification(id));

  const getNotificationIcon = (type) => {
    switch (type) {
      case "feedback":
        return <MessageCircle className="w-6 h-6 text-blue-500" />;

      case "deadline":
        return <Clock5 className="w-6 h-6 text-red-500" />;

      case "approval":
        return <BadgeCheck className="w-6 h-6 text-green-500" />;

      case "meeting":
        return <Calendar className="w-6 h-6 text-purple-500" />;

      case "system":
        return <Settings className="w-6 h-6 text-gray-500" />;

      default:
        // Custom combined icon (User + Down Arrow)
        return (
          <div
            className="relative w-6 h-6 text-slate-500 
      flex items-center justify-center"
          >
            <User className="w-5 h-5 absolute" />
            <ChevronDown className="w-4 h-4 absolute top-4" />
          </div>
        );
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border border-red-500";
        break;
      case "medium":
        return "border border-yellow-500";
        break;
      case "low":
        return "border border-green-500";
        break;

      default:
        return "border border-slate-300";
        break;
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs=now-date;
    const diffMinutes=Math.floor(diffMs/(1000*60));
    const diffHours=Math.floor(diffMs/(1000*60*60));
    const diffDays=Math.floor(diffMs/(1000*60*60*24));

    if(diffMinutes<1)return "Just now";
    if(diffMinutes<60)return `${diffMinutes} min ago`;
    if(diffHours<24)return `${diffHours} hrs ago`;
    if(diffDays===1)return "Yesterday";
    if(diffDays<=7)return `${diffDays} days ago`

    
      return date.toLocaleDateString();
    
  };

  const stats = [
    {
      title: "Total",
      value: notifications.length,
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      textColor: "text-blue-600",
      titleColor: "text-blue-800",
      valueColor: "text-blue-900",
      Icon: User,
    },
    {
      title: "Unread",
      value: unreadCount,
      bg: "bg-red-50",
      iconBg: "bg-red-100",
      textColor: "text-red-600",
      titleColor: "text-red-800",
      valueColor: "text-red-900",
      Icon: AlertCircle,
    },
    {
      title: "High Priority",
      value: notifications.filter((n) => n.priority === "high").length,
      bg: "bg-yellow-50",
      iconBg: "bg-yellow-100",
      textColor: "text-yellow-600",
      titleColor: "text-yellow-800",
      valueColor: "text-yellow-900",
      Icon: Clock,
    },
    {
      title: "This Week",
      value: notifications.filter((n) => {
        const notifDate = new Date(n.date);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return notifDate >= weekAgo;
      }).length,
      bg: "bg-green-50",
      iconBg: "bg-green-100",
      textColor: "text-green-600",
      titleColor: "text-green-800",
      valueColor: "text-green-900",
      Icon: CheckCircle2,
    },
  ];

  return (
    <>
      <div className="space-y-6">
        <div className="card">
          {/* Card header */}
          <div className="card-header">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="card-title">Notifications</h1>
                <p className="card-subtitle">
                  Stay Updated With Your Project Progress And Deadlines
                </p>
              </div>
              {unreadCount > 0 && (
                <button
                  className="btn-outline btn-small"
                  onClick={markAllAsReadHandler}
                >
                  Mark All As Read ({unreadCount})
                </button>
              )}
            </div>
          </div>

          {/* Notifications Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {stats.map((item, i) => {
              return (
                <div key={i} className={`${item.bg} rounded-lg p-4`}>
                  <div className="flex items-center">
                    <div className={`p-2 ${item.iconBg} rounded-lg`}>
                      <item.Icon className={`w-5 h-5 ${item.textColor}`} />
                    </div>

                    <div className="ml-3">
                      <p className={`text-sm font-medium ${item.titleColor}`}>
                        {item.title}
                      </p>
                      <p className={`text-sm font-medium ${item.valueColor}`}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* NOtifications List */}
          <div className="space-y-3">
  {notifications.map((notification) => {
    return (
      <div
        key={notification._id}
        className={`rounded-xl p-4 transition-all duration-200 shadow-sm border ${getPriorityColor(
          notification.priority
        )} ${
          !notification.isRead
            ? "bg-blue-50"
            : "bg-white hover:bg-slate-50"
        }`}
      >
        <div className="flex items-start gap-4">
          
          {/* ICON */}
          <div className="mt-1">
            {getNotificationIcon(notification.type)}
          </div>

          {/* CONTENT */}
          <div className="flex-1 min-w-0">

            {/* TOP ROW */}
            <div className="flex items-center justify-between gap-2">
              <h3
                className={`text-sm font-semibold truncate ${
                  !notification.isRead
                    ? "text-slate-900"
                    : "text-slate-700"
                }`}
              >
                {notification.title}
              </h3>

              <span className="text-xs text-slate-500 whitespace-nowrap">
                {formatDate(notification.createdAt)}
              </span>
            </div>

            {/* MESSAGE */}
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              {notification.message}
            </p>

            {/* BOTTOM ROW */}
            <div className="flex items-center justify-between mt-3">

              {/* TYPE BADGE */}
              <span
                className={`text-xs px-2 py-1 rounded-full capitalize ${
                  notification.type === "feedback"
                    ? "bg-blue-100 text-blue-800"
                    : notification.type === "deadline"
                    ? "bg-red-100 text-red-800"
                    : notification.type === "approval"
                    ? "bg-green-100 text-green-800"
                    : notification.type === "meeting"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {notification.type}
              </span>

              {/* ACTIONS */}
              <div className="flex items-center gap-3">
                {!notification.isRead && (
                  <button
                    className="text-xs font-medium text-blue-600 hover:underline"
                    onClick={() =>
                      markAsReadHandler(notification._id)
                    }
                  >
                    Mark as read
                  </button>
                )}

                <button
                  className="text-xs font-medium text-red-600 hover:underline"
                  onClick={() =>
                    deleteNotificationHandler(notification._id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  })}
</div>

          {notifications.length === 0 && (
            <div className="text-center py-8">
              <div className="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center text-slate-300">
                <BellOff className="w-12 h-12" />
              </div>
              <p className="text-slate-500  ">No Notifications Yet</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationsPage;
