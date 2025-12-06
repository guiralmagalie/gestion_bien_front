import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ChartData, ChartOptions } from 'chart.js';
import { Asset } from '../../models/asset';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { 
  faWrench, faChartPie, faBox, faDollarSign, faExclamationTriangle,
  faChartBar, faPlus, faTools, faCheckCircle, faArrowTrendUp, faCalendar, faArrowRight
} from '@fortawesome/free-solid-svg-icons';

import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Enregistrement obligatoire des controllers
Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement // pour les Pie charts
);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  standalone: false,
})

export class Dashboard implements OnInit {
  currentDate = new Date();
  biens: Asset[] = [];
  maintenanceCost = 0;
  isLoading = true;

  totalValue = 0;

  // FontAwesome icons
  faWrench: IconDefinition = faWrench;
  faPieChart: IconDefinition = faChartPie;
  faBox: IconDefinition = faBox;
  faDollarSign: IconDefinition = faDollarSign;
  faExclamationTriangle: IconDefinition = faExclamationTriangle;
  faChartBar: IconDefinition = faChartBar;
  faPlus: IconDefinition = faPlus;
  faTools: IconDefinition = faTools;
  faCheckCircle: IconDefinition = faCheckCircle;
  faArrowTrendUp: IconDefinition = faArrowTrendUp;
  faCalendar: IconDefinition = faCalendar;
  faArrowRight: IconDefinition = faArrowRight;

  // Graph data
  etatPieData: ChartData<'pie'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#64748b']
    }]
  };

  etatPieOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: { legend: { position: 'bottom' } }
  };

  // Fonction pour obtenir les 6 derniers mois
getLastSixMonths(): string[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const result: string[] = [];
  const now = new Date();
  
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    result.push(months[d.getMonth()]);
  }

  return result;
}


  acquisitionsBarData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Acquisitions',
        data: [4, 2, 7, 1, 5, 3],
        backgroundColor: '#3b82f6'
      }
    ]
  };

  acquisitionsBarOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: { legend: { display: false } }
  };

  constructor(private db: DbService) {}

  async ngOnInit() {
    const loadedBiens = await this.db.getAllAssets();
    const loadedMaintenances = await this.db.getAllMaintenance();

    this.biens = loadedBiens;
    this.maintenanceCost = loadedMaintenances.reduce((acc, curr) => acc + curr.cout, 0);

    this.totalValue = this.biens.reduce((acc, curr) => acc + curr.valeurAchat, 0);
      this.acquisitionsBarData.labels = this.getLastSixMonths();

    this.computeEtatDistribution();
    this.isLoading = false;
  }

  computeEtatDistribution() {
    const states = ['New', 'Good', 'Used', 'Broken', 'Declassified'];
    const counts = states.map(state =>
      this.biens.filter(b => b.etat === state).length
    );

    this.etatPieData.labels = states;
    this.etatPieData.datasets[0].data = counts;
  }
}
