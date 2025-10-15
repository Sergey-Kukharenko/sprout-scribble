import checkDate from './check-date';

type Props = {
  date: Date;
  revenue: number;
}[];

export const weeklyChart = (chartItems: Props) => {
  // const getChart = (count: number, plural: string, singular: string) =>
  //   Array.from({ length: count }, (_, index) => {
  //     const currentLength = count - 1 - index;
  //     const currentPlural =
  //       currentLength === 1 ? `${plural} ago` : `${plural}s ago`;

  //     return {
  //       date:
  //         currentLength > 0 ? `${currentLength} ${currentPlural}` : singular,
  //       revenue: chartItems
  //         .filter((order) => checkDate(order.date, currentLength))
  //         .reduce((acc, price) => acc + price.revenue, 0)
  //     };
  //   });

  // return getChart(7, 'day', 'today');

  return [
    {
      date: '6 days ago',
      revenue: chartItems
        .filter((order) => checkDate(order.date, 6))
        .reduce((acc, price) => acc + price.revenue, 0)
    },
    {
      date: '5 days ago',
      revenue: chartItems
        .filter((order) => checkDate(order.date, 5))
        .reduce((acc, price) => acc + price.revenue, 0)
    },
    {
      date: '4 days ago',
      revenue: chartItems
        .filter((order) => checkDate(order.date, 4))
        .reduce((acc, price) => acc + price.revenue, 0)
    },
    {
      date: '3 days ago',
      revenue: chartItems
        .filter((order) => checkDate(order.date, 3))
        .reduce((acc, price) => acc + price.revenue, 0)
    },
    {
      date: '2 days ago',
      revenue: chartItems
        .filter((order) => checkDate(order.date, 2))
        .reduce((acc, price) => acc + price.revenue, 0)
    },
    {
      date: '1 days ago',
      revenue: chartItems
        .filter((order) => checkDate(order.date, 1))
        .reduce((acc, price) => acc + price.revenue, 0)
    },
    {
      date: 'today',
      revenue: chartItems
        .filter((order) => checkDate(order.date, 0))
        .reduce((acc, price) => acc + price.revenue, 0)
    }
  ];
};
