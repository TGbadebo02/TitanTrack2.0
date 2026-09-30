import React, { useContext } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from '../context/UserOnboardingContext';

const metrics = [
  { label: 'Workouts', icon: 'barbell-outline' },
  { label: 'Minutes', icon: 'time-outline' },
  { label: 'Day streak', icon: 'flame-outline' },
];

const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const ReportScreen = () => {
  const { userInfo } = useContext(UserContext);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>YOUR ACTIVITY</Text>
            <Text style={styles.title}>Progress report</Text>
          </View>
          <View style={styles.headerIcon}>
            <Ionicons name="person-outline" size={21} color="#4ade80" />
          </View>
        </View>

        <View style={styles.periodSelector}>
          <View style={styles.selectedPeriod}>
            <Text style={styles.selectedPeriodText}>This week</Text>
          </View>
          <View style={styles.period}>
            <Text style={styles.periodText}>This month</Text>
          </View>
        </View>

        <View style={styles.metrics}>
          {metrics.map((metric) => (
            <View key={metric.label} style={styles.metricCard}>
              <View style={styles.metricIcon}>
                <Ionicons name={metric.icon} size={17} color="#4ade80" />
              </View>
              <Text style={styles.metricValue}>—</Text>
              <Text style={styles.metricLabel}>{metric.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.activityCard}>
          <View style={styles.activityHeader}>
            <View>
              <Text style={styles.cardTitle}>Weekly activity</Text>
              <Text style={styles.cardSubtitle}>Workouts completed each day</Text>
            </View>
            <Ionicons name="bar-chart-outline" size={21} color="#4ade80" />
          </View>

          <View style={styles.chart}>
            {weekdays.map((day, index) => (
              <View key={`${day}-${index}`} style={styles.dayColumn}>
                <View style={styles.emptyBar} />
                <Text style={styles.dayLabel}>{day}</Text>
              </View>
            ))}
          </View>

          <View style={styles.emptyMessage}>
            <Ionicons name="sparkles-outline" size={15} color="#4ade80" />
            <Text style={styles.emptyMessageText}>
              Complete a workout to begin your report
            </Text>
          </View>
        </View>

        <View style={styles.goalCard}>
          <View style={styles.goalIcon}>
            <Ionicons name="flag-outline" size={20} color="#4ade80" />
          </View>
          <View style={styles.goalText}>
            <Text style={styles.goalLabel}>Fitness goal</Text>
            <Text style={styles.goalValue}>
              {userInfo.fitnessGoal || 'Choose a fitness goal'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#171719' },
  content: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 30 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  eyebrow: {
    color: '#4ade80',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 5,
  },
  title: { color: '#fff', fontSize: 28, fontWeight: '700' },
  headerIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#243429',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#232326',
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
  },
  selectedPeriod: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#353539',
    paddingVertical: 10,
  },
  period: { flex: 1, alignItems: 'center', paddingVertical: 10 },
  selectedPeriodText: { color: '#f5f5f5', fontSize: 13, fontWeight: '600' },
  periodText: { color: '#99999f', fontSize: 13, fontWeight: '500' },
  metrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metricCard: {
    width: '31.5%',
    minHeight: 122,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#343438',
    backgroundColor: '#242426',
  },
  metricIcon: {
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25382b',
    marginBottom: 10,
  },
  metricValue: { color: '#fff', fontSize: 23, fontWeight: '700', marginBottom: 3 },
  metricLabel: { color: '#9b9ba1', fontSize: 11 },
  activityCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#343438',
    backgroundColor: '#242426',
    marginBottom: 12,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  cardTitle: { color: '#f7f7f8', fontSize: 16, fontWeight: '600', marginBottom: 4 },
  cardSubtitle: { color: '#98989e', fontSize: 12 },
  chart: {
    height: 116,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  dayColumn: { width: '10.5%', alignItems: 'center' },
  emptyBar: {
    width: '100%',
    height: 38,
    borderRadius: 5,
    backgroundColor: '#343438',
    marginBottom: 7,
  },
  dayLabel: { color: '#77777e', fontSize: 10 },
  emptyMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#343438',
    paddingTop: 12,
  },
  emptyMessageText: { color: '#aaaab0', fontSize: 11, marginLeft: 7 },
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#343438',
    backgroundColor: '#242426',
  },
  goalIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25382b',
    marginRight: 12,
  },
  goalText: { flex: 1 },
  goalLabel: { color: '#8e8e94', fontSize: 11, marginBottom: 3 },
  goalValue: { color: '#e8e8eb', fontSize: 14, fontWeight: '600' },
});
