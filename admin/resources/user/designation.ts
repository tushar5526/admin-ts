import * as _ from "lodash";
import data from "./district-block-cluster.json";
const designationLevels = [
  {
    designation: "BEEO",
    scope: "Block",
  },
  {
    designation: "BPO",
    scope: "Block",
  },
  {
    designation: "BRCC Primary",
    scope: "Block",
  },
  {
    designation: "BRCC Upper Primary",
    scope: "Block",
  },
  {
    designation: "CHT(P)/CRCC(P)",
    scope: "Cluster",
  },
  {
    designation: "CHT(Sec)/CRCC(Sec)",
    scope: "Cluster",
  },
  {
    designation: "DIET Faculty",
    scope: "District",
  },
  {
    designation: "DIET Office",
    scope: "District",
  },
  {
    designation: "Deputy Director Elementary",
    scope: "District",
  },
  {
    designation: "Deputy Director Higher",
    scope: "District",
  },
  {
    designation: "Deputy Director Inspection Cadre",
    scope: "District",
  },
  {
    designation: "Director Higher Education",
    scope: "State",
  },
  {
    designation: "Directorate Elementary Education (office login)",
    scope: "State",
  },
  {
    designation: "Directorate Higher Education (office login)",
    scope: "State",
  },
  {
    designation: "District Project Officer",
    scope: "District",
  },
  {
    designation: "Joint Director Inspection Cadre",
    scope: "State",
  },
  {
    designation: "State Project Director",
    scope: "State",
  },
  {
    designation: "State Project Office",
    scope: "State",
  },
  {
    designation: "Test",
    scope: "State",
  },
  {
    designation: "Director Elementary Education",
    scope: "State",
  },
];

export const getLowerDesignationsChoices = (_user: any) => {
  const user = _user?.user?.user || null;
  if (!user) {
    return [];
  }
  // const level = user?.data?.roleData?.geographic_level;

  const level = user?.data?.roleData;
  if (!level) {
    return [];
  }

  const choices: { id: string; name: string }[] = [];
  if (level.state) {
    designationLevels
      .filter(
        (a: any) =>
          a.scope === "State" ||
          a.scope === "District" ||
          a.scope === "Block" ||
          a.scope === "Cluster"
      )
      .forEach((item) =>
        choices.push({ id: item.designation, name: item.designation })
      );
  } else if (level?.district) {
    designationLevels
      .filter(
        (a: any) =>
          a.scope === "District" || a.scope === "Block" || a.scope === "Cluster"
      )
      .forEach((item) =>
        choices.push({ id: item.designation, name: item.designation })
      );
  } else if (level?.block) {
    designationLevels
      .filter((a: any) => a.scope === "Block" || a.scope === "Cluster")
      .forEach((item) =>
        choices.push({ id: item.designation, name: item.designation })
      );
  } else if (level.cluster) {
    designationLevels
      .filter((a: any) => a.scope === "Cluster")
      .forEach((item) =>
        choices.push({ id: item.designation, name: item.designation })
      );
  }

  return choices;
};

export const getLowerDesignations = (_user: any) => {
  const user = _user || null;
  if (!user) {
    return [];
  }
  const level = user?.data?.roleData?.geographic_level;
  if (!level) {
    return [];
  }
  if (level === "District") {
    return designationLevels.filter(
      (a: any) =>
        a.scope === "District" || a.scope === "Block" || a.scope === "Cluster"
    );
  }
  if (level === "Block") {
    return designationLevels.filter(
      (a: any) => a.scope === "Block" || a.scope === "Cluster"
    );
  }
  if (level === "Cluster") {
    return designationLevels.filter((a: any) => a.scope === "Cluster");
  }

  if (level === "State") {
    return designationLevels.filter((a: any) => a.scope === "State");
  }
};

export const getLevelFromDesignation = (designation: string) => {
  const item = designationLevels.find((d) => designation === d.designation);
  return item?.scope;
};

export const getVisibility = (designation: string, level: string) => {
  if (!getLevelFromDesignation(designation)) {
    return false;
  }
  switch (getLevelFromDesignation(designation)) {
    case "District":
      return level === "District";
    case "Block":
      return level === "District" || level === "Block";
    case "Cluster":
      return level === "District" || level === "Block" || level === "Cluster";
  }
  return false;
};

export const getAllDistricts = (district?: string, user?: any) => {
  const _user = user?.user?.user || null;

  const level = _user?.data?.roleData;
  console.log(level, "level");

  if (level?.district || level?.state || level?.cluster || level?.block) {
    const districts = () => {
      if (!data) {
        return [];
      }
      return _.uniqBy(data, "District").map((a) => {
        return {
          id: a.District,
          name: a.District,
        };
      });
    };
    return districts();
  }
  const districts = () => {
    if (!data) {
      return [];
    }
    return _.uniqBy(data, "District").map((a) => {
      return {
        id: a.District,
        name: a.District,
      };
    });
  };
  return districts();
};

export const getBlocks = (district: string, block?: string, user?: any) => {
  const _user = user?.user?.user || null;

  const level = _user?.data?.roleData;
  if (level?.block || level?.cluster) {
    const blocks = () => {
      if (!district || !data) {
        return [];
      }
      return _.uniqBy(
        data.filter((d) => d.District === district),
        "block"
      ).map((a) => {
        return {
          id: a.Block,
          name: a.Block,
        };
      });
    };
    return blocks();
  }

  const blocks = () => {
    if (!district || !data) {
      return [];
    }
    return _.uniqBy(
      data.filter((d) => d.District === district),
      "block"
    ).map((a) => {
      return {
        id: a.Block,
        name: a.Block,
      };
    });
  };
  return blocks();
};

export const getClusters = (block: string, cluster?: string, user?: any) => {
  const _user = user?.user?.user || null;

  const level = _user?.data?.roleData;
  if (level?.cluster) {
    // @ts-ignore
    const clusters = () => {
      if (!block || !data) {
        return [];
      }
      return _.uniqBy(
        data.filter((d) => d.Block === block),
        "cluster"
      ).map((a) => {
        return {
          id: a.Cluster,
          name: a.Cluster,
        };
      });
    };
    return clusters();
  }

  // @ts-ignore
  const clusters = () => {
    if (!block || !data) {
      return [];
    }
    return _.uniqBy(
      data.filter((d) => d.Block === block),
      "cluster"
    ).map((a) => {
      return {
        id: a.Cluster,
        name: a.Cluster,
      };
    });
  };
  return clusters();
};
