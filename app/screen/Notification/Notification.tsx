// there is a push communication link between diet and notificaion but it isn't functional yet
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from @react-navigation/native

// Modal component example (assuming you have one)
const CustomModal = ({ visibility, closeModal, text }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visibility}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={{marginRight:250}}>Details:</Text>
          <Text>{text}</Text>
          <Button title="Close" onPress={closeModal} />
        </View>
      </View>
    </Modal>
  );
};

const Notification = () => {
  const navigation = useNavigation(); // Initialize navigation hook

  // Example notification data
  const [notifications, setNotifications] = useState([
    { id: 1, header:"Account Creation", message: "Account has successfully been created", read: false, date: new Date("2024-07-15") },
    { id: 2, header:"Welcome Message", message: "Welcome to Be fit, eat healthy live healthy", read: false, date: new Date("2024-07-15") },
    { id: 3, header:"Update Message", message: "Update: Your meal plan has been updated", read: false, date: new Date("2024-07-15") },
  ]);

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [badgeCount, setBadgeCount] = useState(0);

  // Calculate number of unread notifications
  useEffect(() => {
    const newNotificationsCount = notifications.filter(notification => !notification.read).length;
    setBadgeCount(newNotificationsCount);
    // Update navigation params with the new badgeCount
    navigation.setParams({ badgeCount: newNotificationsCount });
  }, [notifications]);

  const handleNotificationPress = (notification) => {
    setSelectedNotification(notification);
    // Mark the notification as read when clicked
    notification.read = true;
    // Update state with the modified notifications array
    setNotifications([...notifications]);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      {/* Display notifications */}
      <View style={styles.notificationList}>
        {notifications.map((notification) => (
          <TouchableOpacity key={notification.id} onPress={() => handleNotificationPress(notification)}>
            <View style={[styles.notificationItem, notification.read ? styles.readNotification : styles.unreadNotification]}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.headerText}>{notification.header}</Text>
                <Text style={styles.dateText}>{formatDate(notification.date)}</Text>
              </View>
              <Text>{notification.message}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal to display notification details */}
      <CustomModal visibility={modalVisible} closeModal={closeModal} text={selectedNotification?.message} />

      {/* Tab badge to indicate new notifications */}
      {badgeCount > 0 && (
        <View style={styles.tabBadge}>
          <Text style={styles.tabBadgeText}>{badgeCount}</Text>
        </View>
      )}
    </View>
  );
};

const formatDate = (date) => {
  const options = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notificationList: {
    flex: 1,
    backgroundColor:'white',
  },
  notificationItem: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'lightgreen',
    borderRadius: 5,
  },
  unreadNotification: {
    backgroundColor: 'lightgreen',
  },
  readNotification: {
    backgroundColor: '#0bad7c',
  },
  headerText:{
    fontSize:14,
    fontWeight:'bold',
    alignSelf:'flex-start'
  },

  dateText: {
    fontWeight: 'bold',
    fontSize:13,
    marginBottom: 5,
    alignSelf:'flex-end'
  },
  tabBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  // Styles for the modal component
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default Notification;
