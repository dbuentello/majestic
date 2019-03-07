export type TestFileStatus = "IDLE" | "EXECUTING";

export default class Results {
  private results: {
    [path: string]: {
      status: TestFileStatus;
      report?: any;
    };
  };

  private summary: {
    numFailedTests: number;
    numPassedTests: number;
    numPassedTestSuites: number;
    numFailedTestSuites: number;
  };

  constructor() {
    this.results = {};
    this.summary = {
      numFailedTests: 0,
      numPassedTests: 0,
      numPassedTestSuites: 0,
      numFailedTestSuites: 0
    };
  }

  public setTestStart(path: string) {
    this.setDefaultStatus(path);
    const resultforPath = this.results[path];
    resultforPath.status = "EXECUTING";
  }

  public setTestReport(path: string, report: any) {
    this.setDefaultStatus(path);
    const resultforPath = this.results[path];
    resultforPath.status = "IDLE";
    resultforPath.report = report;
  }

  public getResult(path: string) {
    return this.results[path] || null;
  }

  public setSummary(
    passedTests: number,
    failedTests: number,
    numPassedTestSuites: number,
    numFailedTestSuites: number
  ) {
    this.summary = {
      numFailedTests: failedTests,
      numPassedTests: passedTests,
      numPassedTestSuites,
      numFailedTestSuites
    };
  }

  public getSummary() {
    return this.summary;
  }

  private setDefaultStatus(path: string) {
    if (!this.results[path]) {
      this.results[path] = {
        status: "IDLE"
      };
    }
  }
}