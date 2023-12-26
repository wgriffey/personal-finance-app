export interface ChartProps {
    chartType: string;
    data:
        | [string | number, string | number][]
        | [string | number, string | number, string | number][];
    // options: GoogleChartOptions;
}
