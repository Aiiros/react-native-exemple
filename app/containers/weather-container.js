// @flow
import React from 'react';
import { View, Button, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchData } from '../actions/fetch-data';

const getErrorMessage = () => (
  <Text style={styles.errorText}>An Error occured when fetching data</Text>
);

const getWeatherInfo = (weatherInfo) => {
  const { summary, temperature } = weatherInfo;
  const info = temperature
    ? `${Math.floor(temperature)} deg, ${summary}`
    : 'No Weather Info Available. Make sure you provided a valid API key in the `config.js` file.';

  return (
    <Text style={styles.weatherInfoText}>
      {info}
    </Text>
  );
};

const WeatherComponent = (props) => {
  const {
    isLoading,
    error,
    fetchData,
    weatherInfo,
  } = props;

  const hasWeatherData = Object.keys(weatherInfo).length;

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator /> : null}
      {error ? getErrorMessage() : null}
      {hasWeatherData ? getWeatherInfo(weatherInfo) : null}
      <Button
        onPress={fetchData}
        title='Load Data'
      />
    </View>
  );
};


const mapStateToProps = (state) => ({
  ...state.weather
})

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
  },
  weatherInfoText: {
    textAlign: 'center',
    paddingVertical: 6,
    paddingHorizontal: 40,
  },
});