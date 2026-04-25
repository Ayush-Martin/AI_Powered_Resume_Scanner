import { injectable } from "inversify";
import { IScanReportRepository } from "../interface/repositories/IScanReport.repository";
import { ScanReport } from "../database/mysql/models";
import ScanReportEntity from "../../domain/entities/scanReport.entity";
import { Attributes } from "sequelize";

@injectable()
class ScanReportRepository implements IScanReportRepository {
  private _toEntity(row: ScanReport): ScanReportEntity {
    return new ScanReportEntity(
      row.userId,
      row.jobRoleId,
      row.matchPercentage,
      row.analysisResult,
      row.id,
      row.createdAt,
      row.updatedAt,
    );
  }

  private _toPersistence(
    entity: ScanReportEntity,
  ): Omit<Attributes<ScanReport>, "id" | "createdAt" | "updatedAt"> {
    return {
      userId: entity.userId,
      jobRoleId: entity.jobRoleId,
      matchPercentage: entity.matchPercentage,
      analysisResult: entity.analysisResult,
    };
  }

  public async create(entity: ScanReportEntity): Promise<ScanReportEntity> {
    const persistenceData = this._toPersistence(entity);
    const createdRow = await ScanReport.create(persistenceData);
    return this._toEntity(createdRow);
  }

  public async findById(id: number): Promise<ScanReportEntity | null> {
    const row = await ScanReport.findByPk(id);
    return row ? this._toEntity(row) : null;
  }

  public async getUserScanReports(
    userId: number,
    page: number,
    size: number,
  ): Promise<ScanReportEntity[]> {
    const offset = (page - 1) * size;
    const rows = await ScanReport.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]], // Show most recent scans first
      limit: size,
      offset: offset,
    });
    return rows.map((row) => this._toEntity(row));
  }

  public async getTotalNumberOfScanReports(userId: number): Promise<number> {
    return await ScanReport.count({
      where: { userId },
    });
  }

  public async delete(id: number): Promise<void> {
    const deletedCount = await ScanReport.destroy({
      where: { id },
    });

    if (deletedCount === 0) {
      throw new Error(`Scan report with ID ${id} not found.`);
    }
  }
}

export default ScanReportRepository;
