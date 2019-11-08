import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View
} from 'react-native';
import Agenda from './CalendarScreen.js';

export default class CalendarsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
			<Agenda />
    )
  }

}
