import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Dimensions,
  processColor
} from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-charts-wrapper'

export default class RNChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pie: {
        title: 'Favorite Food in Jogja',
        detail: {
          time_value_list: [2017],
          legend_list: ['Hamburger', 'Steak', 'Pecel', 'Magelangan'],
          dataset: {
            Hamburger: { '2017': 9 },
            Steak: { '2017': 17 },
            Pecel: { '2017': 29 },
            Magelangan: { '2017': 45 }
          }
        }
      },
      line: {
        title: 'Development smartphone in Indonesia',
        detail: {
          time_value_list: ['2011', '2012', '2013', '2014', '2015', '2016'],
          legend_list: ['Samsung', 'Apple', 'Sony'],
          dataset: {
            Samsung: {
              '2011': 371,
              '2012': 8112,
              '2013': 8806,
              '2014': 6954,
              '2015': 1097,
              '2016': 8332
            },
            Apple: {
              '2011': 7151,
              '2012': 5664,
              '2013': 2404,
              '2014': 3744,
              '2015': 2832,
              '2016': 5539
            },
            Sony: {
              '2011': 7564,
              '2012': 2172,
              '2013': 1167,
              '2014': 3844,
              '2015': 759,
              '2016': 5752
            }
          }
        }
      }
    }
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  renderPie() {
    const time = this.state.pie.detail.time_value_list
    const legend = this.state.pie.detail.legend_list
    const dataset = this.state.pie.detail.dataset

    var dataSetsValue = []
    var dataStyle = {}
    var legendStyle = {}
    var descStyle = {}
    var xAxisStyle = {}
    var chooseStyle = {}
    var valueLegend = []
    var colorLegend = []

    legend.map((legendValue) => {
      time.map((timeValue) => {
        const datasetValue = dataset[legendValue]
        const datasetTimeValue = datasetValue[timeValue]

        valueLegend.push({ value: parseInt(datasetTimeValue), label: legendValue })
      })
      colorLegend.push(processColor(this.getRandomColor()))
    })

    const datasetObject = {
      values: valueLegend,
      label: '',
      config: {
        colors: colorLegend,
        valueTextSize: 20,
        valueTextColor: processColor('green'),
        sliceSpace: 5,
        selectionShift: 13
      }
    }
    dataSetsValue.push(datasetObject)

    legendStyle = {
      enabled: true,
      textSize: 12,
      form: 'CIRCLE',
      position: 'BELOW_CHART_RIGHT',
      wordWrapEnabled: true
    }
    dataStyle = {
      dataSets: dataSetsValue
    }
    descStyle = {
      text: '',
      textSize: 15,
      textColor: processColor('darkgray')
    }

    return (
      <View>
        <PieChart
          style={styles.bar}
          chartDescription={descStyle}
          data={dataStyle}
          legend={legendStyle}
          highlights={[{ x: 2 }]} />
      </View>
    )
  }

  renderLine() {
    const time = this.state.line.detail.time_value_list
    const legend = this.state.line.detail.legend_list
    const dataset = this.state.line.detail.dataset

    var dataSetsValue = []
    var dataStyle = {}
    var legendStyle = {}
    var descStyle = {}
    var xAxisStyle = {}
    var chooseStyle = {}
    var valueLegend = []
    var colorLegend = []

    legend.map((legendValue) => {
      var valueLegend = []

      time.map((timeValue) => {
        const datasetValue = dataset[legendValue]
        const datasetTimeValue = datasetValue[timeValue]

        valueLegend.push({ y: parseInt(datasetTimeValue) })
      })

      const datasetObject = {
        values: valueLegend,
        label: legendValue,
        config: {
          lineWidth: 1,
          drawCubicIntensity: 0.4,
          circleRadius: 5,
          drawHighlightIndicators: false,
          color: processColor(this.getRandomColor()),
          drawFilled: true,
          fillColor: processColor(this.getRandomColor()),
          fillAlpha: 45,
          circleColor: processColor(this.getRandomColor()),
          drawValues: false
        }
      }
      dataSetsValue.push(datasetObject)
    })

    legendStyle = {
      enabled: true,
      textColor: processColor('blue'),
      textSize: 12,
      position: 'BELOW_CHART_RIGHT',
      form: 'SQUARE',
      formSize: 14,
      xEntrySpace: 10,
      yEntrySpace: 5,
      formToTextSpace: 5,
      wordWrapEnabled: true,
      maxSizePercent: 0.5
    }
    dataStyle = {
      dataSets: dataSetsValue
    }
    xAxisStyle = {
      valueFormatter: time
    }
    const markers = {
      enabled: true,
      digits: 2,
      backgroundTint: processColor('teal'),
      markerColor: processColor('#F0C0FF8C'),
      textColor: processColor('white')
    }

    return (
      <View>
        <LineChart
          style={styles.bar}
          data={dataStyle}
          chartDescription={{ text: '' }}
          legend={legendStyle}
          marker={markers}
          xAxis={xAxisStyle}
          drawGridBackground={false}
          borderColor={processColor('teal')}
          borderWidth={1}
          drawBorders
        />
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>
          Line Chart
        </Text>
        {this.renderLine()}
        <Text style={styles.title}>
          Pie Chart
        </Text>
        {this.renderPie()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  bar: {
    marginTop: 10,
    height: Dimensions.get('window').height / 2,
    width: Dimensions.get('window').width
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});