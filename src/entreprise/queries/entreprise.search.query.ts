export class EntrepriseSearchByLocationQuery {
  public readonly latitude: number;
  public readonly longitude: number;
}

export class EntrepriseSearchQuery {
  constructor(
    public readonly name?: string,
    public readonly location?: EntrepriseSearchByLocationQuery,
    public readonly distance?: number,
  ) {}
}
