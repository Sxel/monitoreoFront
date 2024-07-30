import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api'; // Adjust according to your configuration

  constructor(private http: HttpClient) { }

  getMonitoringData(): Observable<any> {
    const readings = this.http.get<number>(`${this.apiUrl}/monitoring/readings`);
    const mediumAlerts = this.http.get<number>(`${this.apiUrl}/monitoring/medium-alerts`);
    const redAlerts = this.http.get<number>(`${this.apiUrl}/monitoring/red-alerts`);
    const disabledSensors = this.http.get<number>(`${this.apiUrl}/monitoring/disabled-sensors`);

    return forkJoin({
      totalReadings: readings,
      totalMediumAlerts: mediumAlerts,
      totalRedAlerts: redAlerts,
      disabledSensorsCount: disabledSensors
    });
  }

  getPlants(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/plants`).pipe(
      map((response: { content: any; }) => response.content) // Extraer solo el array de plantas
    );
  }
  createPlant(plant: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/plants`, plant);
  }

  updatePlant(id: number, plant: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/plants/${id}`, plant);
  }

  deletePlant(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/plants/${id}`);
  }

  getSensorMetrics(): Observable<any[]> {
   
    return of([
      { title: 'Temperatura', icon: 'thermostat', okValue: 100, warningValue: 20, dangerValue: 3 },
      { title: 'Presión', icon: 'compress', okValue: 100, warningValue: 20, dangerValue: 3 },
      { title: 'Viento', icon: 'air', okValue: 100, warningValue: 20, dangerValue: 3 },
      { title: 'Niveles', icon: 'waves', okValue: 100, warningValue: 20, dangerValue: 3 },
      { title: 'Energía', icon: 'bolt', okValue: 100, warningValue: 20, dangerValue: 3 },
      { title: 'Tensión', icon: 'electric_meter', okValue: 100, warningValue: 20, dangerValue: 3 },
      { title: 'Monóxido de carbono', icon: 'co2', okValue: 100, warningValue: 20, dangerValue: 3 },
      { title: 'Otros gases', icon: 'gas_meter', okValue: 100, warningValue: 20, dangerValue: 3 }
    ]);
  }
}