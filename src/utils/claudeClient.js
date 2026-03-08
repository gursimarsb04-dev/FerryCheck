// simulated claudeClient.js for frontend prototype
// In production, this would POST to a serverless function proxying the Anthropc API.
import { getBoroughFromAddress } from './mapsClient';

export const generateRecommendation = async (origin, destination, routesData) => {
    // Determine borough for contextual recommendation
    const borough = await getBoroughFromAddress(destination);

    // Simulate AI synthesis latency
    return new Promise(resolve => setTimeout(() => {
        let text = "";

        switch (borough) {
            case 'manhattan':
                text = "Based on your destination in Manhattan, the Ferry offers a highly competitive travel time, though the required Uber ride from Pier 11 keeps its carbon emissions slightly higher than the NJ Transit Bus. If time is your absolute priority, the Ferry is a strong option.";
                break;
            case 'brooklyn':
                text = "Since you are heading to Brooklyn, the Ferry loses its geographic advantage—requiring a long and expensive last-mile commute from Pier 11. Carpooling or driving directly via the Staten Island Expressway is significantly faster and more carbon-efficient.";
                break;
            case 'queens':
                text = "For a trip to Queens, transferring from the Carteret Ferry to the subway at Pier 11 adds significant friction. The NJ Transit Bus to Port Authority followed by the subway provides the best balance of low emissions, cost, and direct routing.";
                break;
            case 'staten_island':
                text = "Given your destination is Staten Island, the Ferry is not a viable option as it bypasses the borough entirely. Driving solo or carpooling via the Goethals Bridge dominates in both time and convenience.";
                break;
            case 'bronx':
                text = "Traveling all the way to the Bronx makes the Ferry route highly inefficient. Driving to the Rahway station and taking NJ Transit Train to Penn Station, followed by an Uptown express subway, is your optimal choice.";
                break;
            default:
                text = "Based on your inputs, the NJ Transit Bus provides the best baseline of low emissions and reasonable cost. The Ferry is an option, but last-mile connectivity may increase both your carbon footprint and total cost.";
        }

        resolve({
            recommendation: text,
            bestCarbon: "bus",
            bestCost: "walk",
            bestTime: "car"
        });
    }, 1500));
};
