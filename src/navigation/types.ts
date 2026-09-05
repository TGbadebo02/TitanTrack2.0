import type { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
    Home: undefined;
    Profile: undefined;
    Report: undefined;
};

export type AuthStackParamList = {
    IntroScreen: undefined;
    AdvertisingPage: undefined;
    AdvertisingPage2: undefined;
    AbtYourself: undefined;
    AgeScreen: undefined;
    WeightScreen: undefined;
    FitnessLevelScreen: undefined;
    GoalScreen: undefined;
    LoginScreen: undefined;
    SignupScreen: undefined;
};

export type AppStackParamList = {
    Tabs: NavigatorScreenParams<MainTabParamList>;
    WorkoutScreen: undefined;
};
