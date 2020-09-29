# expo-nested-navigation-ts

## Navigation Tree

- Root Stack
  - Main (BottomTab) Stack
    - TabOne Stack
    - TabTwo Stack
  - NotFoundScreen

## Codes

In types.tsx:

```ts
// ...

export type MainParamList = {
  TabOne?: NestedNavigator<TabOneParamList>;
  TabTwo?: NestedNavigator<TabTwoParamList>;
};

type MainNavigation = CompositeNavigationProp<StackNavigationProp<MainParamList>, RootNavigation>

export type MainNavigationProps<RouteName extends keyof MainParamList> = {
  navigation: CompositeNavigationProp<StackNavigationProp<MainParamList, RouteName>, RootNavigation>
  route: RouteProp<MainParamList, RouteName>
}

// ...

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabOneNavigationProps<RouteName extends keyof TabOneParamList> = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<TabOneParamList, RouteName>, /** Own Stack */
    MainNavigation /** Parent Stack */
  >
  route: RouteProp<TabOneParamList, RouteName>
}

export type TabTwoParamList = {
  TabTwoScreen?: { name: string };
};

export type TabTwoNavigationProps<RouteName extends keyof TabTwoParamList> = {
  navigation: CompositeNavigationProp<StackNavigationProp<TabTwoParamList, RouteName>, MainNavigation>
  route: RouteProp<TabTwoParamList, RouteName>
}
```

Now you can use `TabOneNavigationProps` and `TabTwoNavigationProps` in Screen components

```tsx
type Props = TabOneNavigationProps<'TabOneScreen'>

export default function TabOneScreen({ navigation }: Props) {
  return (
    <View>
      {/** Type checking passes! */}
      <TouchableOpacity onPress={() => navigation.navigate('TabTwo', { screen: 'TabTwoScreen', params: { name: 'Arthur' } })}>
        <Text>Go to TabTwo</Text>
      </TouchableOpacity>

      {/** Causes type error! */}
      <TouchableOpacity onPress={() => navigation.navigate('TabTwoScreen')}>
        <Text>Go to TabTwo</Text>
      </TouchableOpacity>
    </View>
  );
}

// ...

type Props = TabTwoNavigationProps<'TabTwoScreen'>

export default function TabTwoScreen({ route }: Props) {
  // `route` also typed
  const name = route.params?.name // => string | undefined

  return (
    <View>
      {name && <Text>Hello, {name}!</Text>}
    </View>
  );
}
```
