import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';

export type NestedNavigator<T> = { screen: keyof T; params?: T[keyof T] }

/**
 * - Root Stack
 *   - Main (BottomTab) Stack
 *     - TabOne Stack
 *     - TabOne Stack
 *   - NotFoundScreen
 */

/**
 * Root Stack
 */

export type RootStackParamList = {
  Main?: NestedNavigator<MainParamList>;
  NotFound: undefined;
};

type RootNavigation = StackNavigationProp<RootStackParamList>

export type RootNavigationProps<RouteName extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, RouteName>
  route: RouteProp<RootStackParamList, RouteName>
}

/**
 * Main Stack
 */

export type MainParamList = {
  TabOne?: NestedNavigator<TabOneParamList>;
  TabTwo?: NestedNavigator<TabTwoParamList>;
};

type MainNavigation = CompositeNavigationProp<StackNavigationProp<MainParamList>, RootNavigation>

export type MainNavigationProps<RouteName extends keyof MainParamList> = {
  navigation: CompositeNavigationProp<StackNavigationProp<MainParamList, RouteName>, RootNavigation>
  route: RouteProp<MainParamList, RouteName>
}

/**
 * TabOne Stack
 */

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabOneNavigationProps<RouteName extends keyof TabOneParamList> = {
  navigation: CompositeNavigationProp<StackNavigationProp<TabOneParamList, RouteName>, MainNavigation>
  route: RouteProp<TabOneParamList, RouteName>
}

/**
 * TabTwo Stack
 */

export type TabTwoParamList = {
  TabTwoScreen?: { name: string };
};

export type TabTwoNavigationProps<RouteName extends keyof TabTwoParamList> = {
  navigation: CompositeNavigationProp<StackNavigationProp<TabTwoParamList, RouteName>, MainNavigation>
  route: RouteProp<TabTwoParamList, RouteName>
}
