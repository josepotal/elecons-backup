(function() {
    'use strict';
    angular
        .module('EleconsApp')
        .factory('DashboardFactory', DashboardFactory)

    function DashboardFactory($http, $rootScope, PricesFactory, ApiFactory) {

        var service = {
            getComparison: getComparison,
            // getMonthData: getMonthData
        };

        return service;

        // function getMonthData() {
        //     let electricPrice = 0.11
        //     ApiFactory.getUser()
        //         .then(response => {
        //         let consumption2016 = response.data.dataUser.monthly[0]
        //         let consumption2017 = response.data.dataUser.monthly[1]

        //         let savingsKWH = consumption2016 - consumption2017;
        //         let savingsEuro = savingsKWH * electricPrice;
        //     })
        // }

        function getComparison() {

            ApiFactory.getUser()
                .then(response => {
                    Highcharts.chart('comparison-chart', {
                        chart: {
                            //backgroundColor: 'none',
                            type: 'column'
                        },
                        title: {
                            text: 'Current Month Consumption'
                        },
                        xAxis: {
                            categories: [
                                'Monthly Consumption'
                            ],
                            crosshair: true
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Electricity Consumption kWh'
                            }
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                '<td style="padding:0"><b>{point.y:.1f} kWh</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0
                            }
                        },
                        exporting: {
                            enabled: false
                        },
                        series: [{
                            name: '2016',
                            data: [response.data.dataUser.monthly[0]]

                        }, {
                            name: '2017',
                            data: [response.data.dataUser.monthly[1]]
                        }]
                    });
                })
        }
    }
})()
