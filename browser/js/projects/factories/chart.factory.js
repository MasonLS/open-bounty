'use strict';

app.factory('ChartFactory', () => {
    let ChartFactory = {}

    ChartFactory.chartConfig = {
        options: {
            chart: {
                backgroundColor: 'transparent',
                zoomType: 'xy',
                resetZoomButton: {
                    position: {
                        x: 0,
                        y: -35
                    },
                    theme: {
                        fill: 'white',
                        stroke: 'silver',
                        r: 0,
                        states: {
                            hover: {
                                fill: '#41739D',
                                style: {
                                    color: 'white'
                                }
                            }
                        }
                    }
                },
                height: 180
            },
            navigator: {
                enabled: false,
                series: {
                    data: []
                }
            },
            rangeSelector: {
                enabled: false
            },
            plotOptions: {
                series: {
                    lineWidth: 1,
                    fillOpacity: 0.5,
                    pointWidth: 25

                },
                column: {
                    stacking: 'normal'
                },
                area: {
                    stacking: 'normal',
                    marker: {
                        enabled: false
                    }
                }
            },
            exporting: false,
            xAxis: [{
                type: 'datetime',
                minTickInterval: 86400000,
                maxTickInterval: 86400000 * 7,
                stackLabels: {
                    enabled: true
                },
            }],
            yAxis: [

                { // Primary yAxis

                    min: 0,
                    allowDecimals: false,
                    title: {
                        text: 'Total raised',
                        style: {
                            color: '#80a3ca'
                        }
                    },
                    labels: {
                        format: '{value}',
                        style: {
                            color: '#80a3ca'
                        }
                    },

                }, { // Secondary yAxis
                    min: 0,
                    allowDecimals: false,
                    title: {
                        text: 'Paid out',
                        style: {
                            color: '#c680ca'
                        }
                    },
                    labels: {
                        format: '{value}',
                        style: {
                            color: '#c680ca'
                        }
                    },
                    opposite: true

                }
            ],

            legend: {
                enabled: false
            },
            title: {
                text: ' '
            },
            credits: {
                enabled: false
            },

            loading: false,
            tooltip: {
                crosshairs: [{
                    width: 1,
                    dashStyle: 'dash',
                    color: '#898989'
                }, {
                    width: 1,
                    dashStyle: 'dash',
                    color: '#898989'
                }],
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#a4a4a4',
                shadow: false,
                useHTML: true,
                percentageDecimals: 2,
                backgroundColor: 'rgba(255,255,255,.7)',
                style: {
                    padding: 0
                },
                shared: true

            },
            useHighStocks: true

        },
        series: [{
            name: 'Donations ',
            type: 'column',
            yAxis: 0,
            tooltip: {
                valueSuffix: ' $'
            },
            color: '#80a3ca',
        }, {
            name: 'Bounties ',
            type: 'line',
            yAxis: 1,
            tooltip: {
                valueSuffix: ' $'
            },
            color: '#c680ca',
        }],
    }
    return ChartFactory;
});
