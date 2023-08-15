interface IUnit {
  id: number,
  unitCategory: string,
  description: string,
  unitSymbol: string
}
interface IMeasurementDefinition {
  id: number,
  name: string
}

export const Units: IUnit[] = [
  {
    id: 0,
    unitCategory: 'NoUnit',
    description: 'NoUnit',
    unitSymbol: ''
  },
  {
    id: 100,
    unitCategory: 'Pressure',
    description: 'UserDefinedPressure',
    unitSymbol: ''
  },
  {
    id: 101,
    unitCategory: 'Pressure',
    description: 'Bar',
    unitSymbol: 'bar'
  },
  {
    id: 102,
    unitCategory: 'Pressure',
    description: 'MilliBar',
    unitSymbol: 'mbar'
  },
  {
    id: 103,
    unitCategory: 'Pressure',
    description: 'PSI',
    unitSymbol: 'PSI'
  },
  {
    id: 104,
    unitCategory: 'Pressure',
    description: 'MegaPascal',
    unitSymbol: 'MPa'
  },
  {
    id: 105,
    unitCategory: 'Pressure',
    description: 'KiloPascal',
    unitSymbol: 'kPa'
  },
  {
    id: 106,
    unitCategory: 'Pressure',
    description: 'Pascal',
    unitSymbol: 'Pa'
  },
  {
    id: 200,
    unitCategory: 'Temperature',
    description: 'UserDefinedTemperature',
    unitSymbol: ''
  },
  {
    id: 201,
    unitCategory: 'Temperature',
    description: 'DegreeCelsius',
    unitSymbol: '°C'
  },
  {
    id: 202,
    unitCategory: 'Temperature',
    description: 'DegreeFarenheit',
    unitSymbol: '°F'
  },
  {
    id: 300,
    unitCategory: 'Length',
    description: 'UserDefinedLength',
    unitSymbol: ''
  },
  {
    id: 301,
    unitCategory: 'Length',
    description: 'Meter',
    unitSymbol: 'm'
  },
  {
    id: 302,
    unitCategory: 'Length',
    description: 'Centimeter',
    unitSymbol: 'cm'
  },
  {
    id: 303,
    unitCategory: 'Length',
    description: 'Inch',
    unitSymbol: 'inch'
  },
  {
    id: 304,
    unitCategory: 'Length',
    description: 'Foot',
    unitSymbol: 'ft'
  },
  {
    id: 400,
    unitCategory: 'Conductivity',
    description: 'UserDefinedConductivity',
    unitSymbol: ''
  },
  {
    id: 401,
    unitCategory: 'Conductivity',
    description: 'MilliSiemensPerCentimeter',
    unitSymbol: 'mS/cm'
  },
  {
    id: 402,
    unitCategory: 'Conductivity',
    description: 'MicroSiemensPerCentimeter',
    unitSymbol: 'uS/cm'
  },
  {
    id: 500,
    unitCategory: 'Voltage',
    description: 'UserDefinedVoltage',
    unitSymbol: ''
  },
  {
    id: 501,
    unitCategory: 'Voltage',
    description: 'Volt',
    unitSymbol: 'V'
  },
  {
    id: 600,
    unitCategory: 'Density',
    description: 'KilogramsPerCubicMeter',
    unitSymbol: 'kg/m³'
  },
  {
    id: 700,
    unitCategory: 'Acceleration',
    description: 'MetersPerSecondSquared',
    unitSymbol: 'm/s²'
  },
  {
    id: 800,
    unitCategory: 'SignalStrength',
    description: 'DecibelsBelow1Milliwatt',
    unitSymbol: 'dDm'
  },
  {
    id: 900,
    unitCategory: 'NoUnit',
    description: 'Percent',
    unitSymbol: '%'
  },
  {
    id: 1000,
    unitCategory: 'Volume',
    description: 'UserDefinedVolume',
    unitSymbol: ''
  },
  {
    id: 1001,
    unitCategory: 'Volume',
    description: 'Liter',
    unitSymbol: 'l'
  },
  {
    id: 1100,
    unitCategory: 'Flow',
    description: 'UserDefinedFlow',
    unitSymbol: ''
  },
  {
    id: 1101,
    unitCategory: 'Flow',
    description: 'CubicMeterPerSecond',
    unitSymbol: 'm³/s'
  },
  {
    id: 1102,
    unitCategory: 'Flow',
    description: 'CubicMeterPerHour',
    unitSymbol: 'm³/h'
  },
  {
    id: 1103,
    unitCategory: 'Flow',
    description: 'LitersPerSecond',
    unitSymbol: 'l/s'
  },
  {
    id: 1200,
    unitCategory: 'Angle',
    description: 'UserDefinedAngle',
    unitSymbol: ''
  },
  {
    id: 1201,
    unitCategory: 'Angle',
    description: 'Degree',
    unitSymbol: '°'
  },
  {
    id: 1202,
    unitCategory: 'Angle',
    description: 'Radians',
    unitSymbol: ''
  }]

export const MeasurementDefinitions: IMeasurementDefinition[] = [
  {
    id: 1,
    name: 'PDP1P2'
  },
  {
    id: 2,
    name: 'P1'
  },
  {
    id: 3,
    name: 'P2'
  },
  {
    id: 4,
    name: 'T'
  },
  {
    id: 5,
    name: 'TOB1'
  },
  {
    id: 6,
    name: 'TOB2'
  },
  {
    id: 7,
    name: 'PBARO'
  },
  {
    id: 8,
    name: 'TBARO'
  },
  {
    id: 9,
    name: 'VOLTINP1'
  },
  {
    id: 10,
    name: 'VOLTINP2'
  },
  {
    id: 11,
    name: 'PDP1PBARO'
  },
  {
    id: 12,
    name: 'CONDUCTIVITYTC'
  },
  {
    id: 13,
    name: 'CONDUCTIVITYRAW'
  },
  {
    id: 14,
    name: 'TCONDUCTIVITY'
  },
  {
    id: 15,
    name: 'P1_2'
  },
  {
    id: 16,
    name: 'P1_3'
  },
  {
    id: 17,
    name: 'P1_4'
  },
  {
    id: 18,
    name: 'P1_5'
  },
  {
    id: 19,
    name: 'COUNTERINPUT'
  },
  {
    id: 20,
    name: 'SDI12CH1'
  },
  {
    id: 21,
    name: 'SDI12CH2'
  },
  {
    id: 22,
    name: 'SDI12CH3'
  },
  {
    id: 23,
    name: 'SDI12CH4'
  },
  {
    id: 24,
    name: 'SDI12CH5'
  },
  {
    id: 25,
    name: 'SDI12CH6'
  },
  {
    id: 26,
    name: 'SDI12CH7'
  },
  {
    id: 27,
    name: 'SDI12CH8'
  },
  {
    id: 28,
    name: 'SDI12CH9'
  },
  {
    id: 29,
    name: 'SDI12CH10'
  },
  {
    id: 30,
    name: 'TOB1_2'
  },
  {
    id: 31,
    name: 'TOB1_3'
  },
  {
    id: 32,
    name: 'TOB1_4'
  },
  {
    id: 33,
    name: 'TOB1_5'
  },
  {
    id: 34,
    name: 'MH20_E'
  },
  {
    id: 35,
    name: 'MH20_F'
  },
  {
    id: 36,
    name: 'MH20_G'
  },
  {
    id: 37,
    name: 'MH20_PBARO'
  },
  {
    id: 38,
    name: 'MH20_P1P2'
  },
  {
    id: 39,
    name: 'MH20_P1P3'
  },
  {
    id: 40,
    name: 'MH20_P1P4'
  },
  {
    id: 41,
    name: 'MH20_P1P5'
  },
  {
    id: 42,
    name: 'CONDUCTIVITYTC_2'
  },
  {
    id: 43,
    name: 'CONDUCTIVITYTC_3'
  },
  {
    id: 44,
    name: 'TCONDUCTIVITY_2'
  },
  {
    id: 45,
    name: 'TCONDUCTIVITY_3'
  },
  {
    id: 46,
    name: 'P2_2'
  },
  {
    id: 47,
    name: 'TOB2_2'
  },
  {
    id: 48,
    name: 'AQUAMASTERFLOWRATE'
  },
  {
    id: 49,
    name: 'AQUAMASTERPRESSURE'
  },
  {
    id: 50,
    name: 'AQUAMASTERCUSTOMFLOWUNITS'
  },
  {
    id: 51,
    name: 'AQUAMASTEREXTERNALSUPPLYVOLTAGE'
  },
  {
    id: 52,
    name: 'TANKCONTENT1'
  },
  {
    id: 53,
    name: 'TANKCONTENT2'
  },
  {
    id: 54,
    name: 'TANKCONTENT3'
  },
  {
    id: 55,
    name: 'MULTISENSOR1'
  },
  {
    id: 56,
    name: 'MULTISENSOR2'
  },
  {
    id: 57,
    name: 'MULTISENSOR3'
  },
  {
    id: 58,
    name: 'MULTISENSOR4'
  },
  {
    id: 59,
    name: 'MULTISENSOR5'
  },
  {
    id: 60,
    name: 'CONVERTER_VOLTAGE_IN'
  },
  {
    id: 61,
    name: 'CONVERTER_VOLTAGE_OUT'
  },
  {
    id: 62,
    name: 'CONVERTER_VOLTAGE_USB'
  },
  {
    id: 63,
    name: 'CONVERTER_CURRENT_OUT'
  },
  {
    id: 64,
    name: 'P1_MIN'
  },
  {
    id: 65,
    name: 'P1_MAX'
  },
  {
    id: 66,
    name: 'P2_MIN'
  },
  {
    id: 67,
    name: 'P2_MAX'
  },
  {
    id: 68,
    name: 'FLOWCALCULATION1'
  },
  {
    id: 69,
    name: 'FLOWCALCULATION2'
  },
  {
    id: 70,
    name: 'FLOWCALCULATION3'
  }
]
