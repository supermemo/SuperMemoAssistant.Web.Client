
import axios from "axios";

const axiosClient = axios.create();

function getPkgInfo(packageName) {
  return axiosClient.get(`https://api.nuget.org/v3/registration3/${packageName.toLowerCase()}/index.json`);
}

class NuGetPackageInfos {
  constructor(resp) {
    if (resp.count == 0) throw new error("No such package found");

    this.items = resp.data.items;
  }

  hasDependency(depPkgName) {
    return this.everyPackage((pkg, pkgDetail) => {
      return this.everyDependencyGroup(pkgDetail, deps => {
        return deps.some(d => d.id === depPkgName);
      });
    });
  }

  getLatestVersion() {
    const catalogPage = this.items[this.items.length - 1];
    const pkg = catalogPage.items[catalogPage.items.length - 1];

    return pkg.catalogEntry;
  }

  everyPackage(predicateFunc) {
    return this.items.every(catalogPage => {
      return catalogPage.items.every(pkg => {
        const pkgDetail = pkg.catalogEntry;

        if (!predicateFunc(pkg, pkgDetail))
          return false;
        
        return true;
      });
    });
  }

  everyDependencyGroup(pkgDetail, predicateFunc) {
    return pkgDetail.dependencyGroups.every(dependencyGroup => {
      return predicateFunc(dependencyGroup.dependencies);
    });
  }
}

export default { getPkgInfo, NuGetPackageInfos };
