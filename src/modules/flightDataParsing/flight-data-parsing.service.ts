import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SerpApiData } from './interfaces';

@Injectable()
export class FlightDataParsingService {
  generateFlightHtml(flightsData: SerpApiData): string {
    try {
      let flightsHtml = '';

      if (flightsData.best_flights && flightsData.best_flights.length) {
        flightsHtml = this.generateFlightsHtml(flightsData.best_flights);
      } else if (
        flightsData.other_flights &&
        flightsData.other_flights.length
      ) {
        flightsHtml = this.generateFlightsHtml(flightsData.other_flights);
      } else {
        flightsHtml = `
          <div class="no-flights">
            <h2>Não foram encontrados voos</h2>
          </div>
          `;
      }

      return flightsHtml;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private generateFlightsHtml(flightGroups): string {
    return flightGroups
      .map((flightGroup) => {
        return flightGroup.flights
          .map((flight) => {
            return `
        <div class="flight-card">
          <div class="flight-header">
            <img src="${flight.airline_logo}" alt="${flight.airline}" class="airline-logo">
            <div>
              <h3>${flight.departure_airport.name} (${flight.departure_airport.id})</h3>
              <p>para</p>
              <h3>${flight.arrival_airport.name} (${flight.arrival_airport.id})</h3>
            </div>
            <span>${flight.departure_airport.time} - ${flight.arrival_airport.time}</span>
          </div>
          <div class="flight-details">
            <p>Duração: ${flight.duration} minutos</p>
            <p>Classe: ${flight.travel_class}</p>
            <p>Preço: $${flightGroup.price}</p>
            <p>Emissão de Carbono: ${flightGroup.carbon_emissions.this_flight} kg (redução de ${flightGroup.carbon_emissions.difference_percent}%)</p>
          </div>
        </div>
        `;
          })
          .join('');
      })
      .join('');
  }
}
