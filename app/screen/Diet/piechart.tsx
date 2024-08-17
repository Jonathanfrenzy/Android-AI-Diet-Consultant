import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path, G, Text as SvgText } from 'react-native-svg';
import { arc, pie } from 'd3-shape';

const PieChart = ({ data, totalCalories }) => {
  // Calculate unused calories
  const totalUsedCalories = data.reduce((acc, item) => acc + item.calories, 0);
  const unusedCalories = totalCalories - totalUsedCalories;

  // Combine data with unused calories as a separate sector
  const pieData = [
    ...data,
    { name: 'Unused', calories: unusedCalories, color: '#ccc' },
  ];

  // Define dimensions and center of the pie chart
  const { width, height } = { width: 300, height: 300 };
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2;

  // Create pie function
  const arcs = pie()
    .value(item => item.calories)
    .sort(null)(pieData);

  // Create arc generator
  const arcGenerator = arc()
    .outerRadius(radius - 20)
    .innerRadius(0);

  return (
    <View style={{ alignSelf: 'center', backgroundColor: '#ffffff', width: 'auto', padding: 10 }}>
      <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: '#0bad7c' }}>Calorie Consumption</Text>
      <Svg width={width} height={height}>
        <G x={centerX} y={centerY}>
          {arcs.map((arcData, index) => {
            const arcPath = arcGenerator(arcData);
            const centroid = arcGenerator.centroid(arcData); // Get centroid of the arc

            return (
              <G key={`arc-${index}`}>
                <Path
                  d={arcPath}
                  fill={pieData[index].color}
                />
                {/* Display text label */}
                <SvgText
                  x={centroid[0]}
                  y={centroid[1]}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fontSize="12"
                  fill="#fff"
                >
                  {pieData[index].name}
                </SvgText>
              </G>
            );
          })}
          {/* Display a white circle in the center */}
          <G>
            <Path
              d={`M ${centerX} ${centerY} m -${radius / 4} 0 a ${radius / 4} ${radius / 4} 0 1 0 ${radius / 2} 0 a ${radius / 4} ${radius / 4} 0 1 0 -${radius / 2} 0`}
              fill="#fff"
            />
          </G>
        </G>
      </Svg>
      <Text style={{ fontSize: 17, fontWeight: 'bold', alignSelf: 'center', color: "#0bad7c" }}>
        Caloric Goal: {totalCalories}
      </Text>
      {totalUsedCalories > totalCalories && (
        <Text style={{ color: 'red' }}>Calorie overload!</Text>
      )}
    </View>
  );
};

export default PieChart;