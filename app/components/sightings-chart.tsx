import { VictoryBar, VictoryChart, VictoryGroup, VictoryTheme } from 'victory';

export function SightingsChart() {
  return (
    <VictoryChart theme={VictoryTheme.clean} domain={{ y: [0.5, 5.5] }} domainPadding={{ x: 40 }}>
      <VictoryGroup offset={20} style={{ data: { width: 15 } }}>
        <VictoryBar
          data={[
            { x: '2023 Q1', y: 1 },
            { x: '2023 Q2', y: 2 },
            { x: '2023 Q3', y: 3 },
            { x: '2023 Q4', y: 2 },
          ]}
        />
        <VictoryBar
          data={[
            { x: '2023 Q1', y: 2 },
            { x: '2023 Q2', y: 3 },
            { x: '2023 Q3', y: 4 },
            { x: '2023 Q4', y: 5 },
          ]}
        />
        <VictoryBar
          data={[
            { x: '2023 Q1', y: 1 },
            { x: '2023 Q2', y: 2 },
            { x: '2023 Q3', y: 3 },
            { x: '2023 Q4', y: 4 },
          ]}
        />
      </VictoryGroup>
    </VictoryChart>
  );
}
