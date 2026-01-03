import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export function ThemedView({ style, ...props }: ViewProps) {
  const backgroundColor = useThemeColor({}, 'background');

  return (
    <View
      {...props}
      pointerEvents="box-none"
      style={[{ backgroundColor }, style]}
    />
  );
}
