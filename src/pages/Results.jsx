import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Results = () => {
  const counters = useSelector((state) => state.counters);

  // Mock data for weekly and monthly counts
  const weeklyData = {
    plastic_bottle: Math.floor(counters.plastic_bottle * 0.2),
    aluminum_can: Math.floor(counters.aluminum_can * 0.2),
    cardboard_carton: Math.floor(counters.cardboard_carton * 0.2),
  };

  const monthlyData = {
    plastic_bottle: Math.floor(counters.plastic_bottle * 0.8),
    aluminum_can: Math.floor(counters.aluminum_can * 0.8),
    cardboard_carton: Math.floor(counters.cardboard_carton * 0.8),
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Recycling Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Weekly</TableHead>
                <TableHead>Monthly</TableHead>
                <TableHead>All-Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(counters).map(([item, count]) => (
                <TableRow key={item}>
                  <TableCell className="font-medium capitalize">{item.replace('_', ' ')}</TableCell>
                  <TableCell>{weeklyData[item]}</TableCell>
                  <TableCell>{monthlyData[item]}</TableCell>
                  <TableCell>{count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Results;