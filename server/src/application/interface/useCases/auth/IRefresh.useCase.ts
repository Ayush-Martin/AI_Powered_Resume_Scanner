export interface IRefreshUseCase {
  execute(userId: number): Promise<{ accessToken: string; refreshToken: string }>;
}