import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminApiService } from '../../core/services/admin-api.service';
import { PointJournalier, VueEnsemble } from '../../core/models/admin.models';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { MmcPipe } from '../../shared/pipes/mmc.pipe';

interface ChartBarPoint {
  jour: string;
  total: number;
  height: number;
}

@Component({
  selector: 'app-vue-ensemble',
  standalone: true,
  imports: [CommonModule, TopbarComponent, MmcPipe],
  templateUrl: './vue-ensemble.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VueEnsembleComponent implements OnInit {
  data: VueEnsemble | null = null;
  commandesChart: ChartBarPoint[] = [];
  coursesChart: ChartBarPoint[] = [];

  constructor(private api: AdminApiService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.api.vueEnsemble().subscribe((d) => {
      this.data = d;
      this.commandesChart = this.buildChartSeries(d.commandesParJour);
      this.coursesChart = this.buildChartSeries(d.coursesParJour);
      this.cd.markForCheck();
    });
  }

  private buildChartSeries(series: PointJournalier[]): ChartBarPoint[] {
    const max = Math.max(1, ...series.map((point) => point.total));

    return series.map((point) => ({
      jour: point.jour,
      total: point.total,
      height: Math.max(4, Math.round((point.total / max) * 100)),
    }));
  }
}
