(function() {
    'use strict';
    angular
        .module('EleconsApp')
        .factory('ChartsFactory', ChartsFactory)

    function ChartsFactory($rootScope, PricesFactory, ApiFactory) {

        var service = {
            //getChartNow: getChartNow,
            getChartHourly: getChartHourly,
            getChartDaily: getChartDaily
        };

        return service;

    // Mehtods of the factory
        // CHART REAL-TIME
        // function getChartNow() {
        //     Highcharts.setOptions({
        //         global: {
        //             useUTC: false
        //         }
        //     });

        //     Highcharts.chart('chart-now', {
        //         chart: {
        //             type: 'spline',
        //             animation: Highcharts.svg, // don't animate in old IE
        //             marginRight: 10,
        //             events: {
        //                 load: function() {
        //                     var series = this.series[0]
        //                     socketio.on('new read', function(data) {
        //                         var x = (new Date()).getTime(), // current time
        //                             y = data.current;
        //                         series.addPoint([x, y], true, true);
        //                     });
        //                 }
        //             }
        //         },
        //         title: {
        //             text: 'Real-time Chart: Instantaneous Power'
        //         },
        //         xAxis: {
        //             type: 'datetime',
        //             tickPixelInterval: 150
        //         },
        //         yAxis: {
        //             title: {
        //                 text: 'Instant Power in kW'
        //             },
        //             plotLines: [{
        //                 value: 0,
        //                 width: 1,
        //                 color: '#808080'
        //             }]
        //         },
        //         tooltip: {
        //             formatter: function() {
        //                 return '<b>' + this.series.name + '</b><br/>' +
        //                     Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
        //                     Highcharts.numberFormat(this.y, 2);
        //             }
        //         },
        //         legend: {
        //             enabled: false
        //         },
        //         exporting: {
        //             enabled: false
        //         },
        //         series: [{
        //             name: 'Power in W',
        //             data: (function() {
        //                 // generate an array of random data
        //                 var data = [],
        //                     time = (new Date()).getTime(),
        //                     i;

        //                 for (i = -19; i <= 0; i += 1) {
        //                     data.push({
        //                         x: time + i * 1000,
        //                         y: data.current
        //                     });
        //                 }
        //                 return data;
        //             }())
        //         }]
        //     });
        // };
        // CHART HOURLY
        function getChartHourly() {

            let hourlyData = []
            ApiFactory.getUser()
                .then((response) => {
                    hourlyData = response.data.dataUser.hourly

                    var pvpcPrices = []
                    PricesFactory.getPrices()
                        .then(function(response) {
                            var aPricesValues = response.map(function(obj) {
                                return obj.price
                            })
                            pvpcPrices = aPricesValues


                            Highcharts.chart('chart-hourly', {
                                chart: {
                                    zoomType: 'xy'
                                        // backgroundColor: '#222222'
                                },
                                title: {
                                    text: 'Hourly Chart: Electricity Consumption and Price'
                                },
                                subtitle: {
                                    text: ''
                                },
                                xAxis: [{
                                    categories: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00',
                                        '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
                                        '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
                                    ],
                                    crosshair: true
                                }],
                                yAxis: [{ // Primary yAxis
                                    labels: {
                                        format: '{value} €/kWh',
                                        style: {
                                            color: Highcharts.getOptions().colors[1]
                                        }
                                    },
                                    title: {
                                        text: 'Electricity Price',
                                        style: {
                                            color: Highcharts.getOptions().colors[1]
                                        }
                                    }
                                }, { // Secondary yAxis
                                    title: {
                                        text: 'Electricity Consumption',
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                    labels: {
                                        format: '{value} kWh',
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                    opposite: true
                                }],
                                tooltip: {
                                    shared: true
                                },
                                legend: {
                                    layout: 'vertical',
                                    align: 'left',
                                    x: 60,
                                    verticalAlign: 'top',
                                    y: 50,
                                    floating: true,
                                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                                },
                                exporting: {
                                    enabled: false
                                },
                                series: [{
                                    name: 'Electricity Consumption',
                                    type: 'column',
                                    yAxis: 1,
                                    data: hourlyData,
                                    tooltip: {
                                        valueSuffix: ' kWh'
                                    }

                                }, {
                                    name: 'Electricity Price',
                                    type: 'spline',
                                    data: pvpcPrices,
                                    tooltip: {
                                        valueSuffix: '€/kWh'
                                    }
                                }]
                            });
                        });
                })
        };

        // CHART DAILY
        function getChartDaily() {

            ApiFactory.getUser()
                .then(function(response) {

                    // create the chart
                    Highcharts.stockChart('chart-daily', {
                        chart: {
                            //backgroundColor: '#3E4852',
                            alignTicks: false
                        },

                        rangeSelector: {
                            selected: 1
                        },

                        title: {
                            text: 'Daily Consumption in kWh'
                        },
                        exporting: {
                            enabled: false
                        },
                        series: [{
                            type: 'column',
                            name: 'Electric Consumption',
                            data: response.data.dataUser.yearly,
                            dataGrouping: {
                                units: [
                                    [
                                        'week', // unit name
                                        [1] // allowed multiples
                                    ],
                                    [
                                        'month', [1, 2, 3, 4, 6]
                                    ]
                                ]
                            }
                        }]
                    });
                });
        };
    }

})()
