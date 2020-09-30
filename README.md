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

type MainNavigation = CompositeNavigationProp<
  StackNavigationProp<MainParamList>, /** Current Stack */
  RootNavigation /** Parent Stack */
>

// ...

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabOneScreenProps<RouteName extends keyof TabOneParamList> = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<TabOneParamList, RouteName>, /** Current Stack */
    MainNavigation /** Parent Stack */
  >
  route: RouteProp<TabOneParamList, RouteName>
}

export type TabTwoParamList = {
  TabTwoScreen?: { name: string };
};

export type TabTwoScreenProps<RouteName extends keyof TabTwoParamList> = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<TabTwoParamList, RouteName>, /** Current Stack */
    MainNavigation /** Parent Stack */
  >
  route: RouteProp<TabTwoParamList, RouteName>
}
```

Now you can use `navigation` and `route` props with `*ScreenProps` in Screen components

```tsx
type Props = TabOneScreenProps<'TabOneScreen'>

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

type Props = TabTwoScreenProps<'TabTwoScreen'>

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
