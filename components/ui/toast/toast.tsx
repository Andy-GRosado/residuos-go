import React from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export default function ToastItem({ toast, onHide }: { toast: Toast; onHide: () => void }) {
  const translateY = new Animated.Value(-100);
  const opacity = new Animated.Value(0);

  React.useEffect(() => {
    // Animation in
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Animation out before removing
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(onHide);
    }, toast.duration);

    return () => clearTimeout(timer);
  }, []);

  const getBackgroundColor = () => {
    switch (toast.type) {
      case 'success': return '#4CAF50';
      case 'error': return '#F44336';
      case 'warning': return '#FF9800';
      case 'info': return '#2196F3';
      default: return '#333';
    }
  };

  return (
    <Animated.View
      style={[
        styles.toast,
        { backgroundColor: getBackgroundColor() },
        { transform: [{ translateY }], opacity },
      ]}
    >
      <Text style={styles.toastText}>{toast.message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
  },
  toast: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
    minWidth: 200,
    maxWidth: '80%',
  },
  toastText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
});
