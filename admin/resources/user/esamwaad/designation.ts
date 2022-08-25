export const designationLevels = [{"id": "BEEO", "name": "BEEO", "scope": "Block", "designation": "BEEO"}, {
    "id": "BPO",
    "name": "BPO",
    "scope": "Block",
    "designation": "BPO"
}, {
    "id": "BRCC Primary",
    "name": "BRCC Primary",
    "scope": "Block",
    "designation": "BRCC Primary"
}, {
    "id": "BRCC Upper Primary",
    "name": "BRCC Upper Primary",
    "scope": "Block",
    "designation": "BRCC Upper Primary"
}, {
    "id": "CHT(P)/CRCC(P)",
    "name": "CHT(P)/CRCC(P)",
    "scope": "Cluster",
    "designation": "CHT(P)/CRCC(P)"
}, {
    "id": "CHT(Sec)/CRCC(Sec)",
    "name": "CHT(Sec)/CRCC(Sec)",
    "scope": "Cluster",
    "designation": "CHT(Sec)/CRCC(Sec)"
}, {
    "id": "DIET Faculty",
    "name": "DIET Faculty",
    "scope": "District",
    "designation": "DIET Faculty"
}, {
    "id": "DIET Office",
    "name": "DIET Office",
    "scope": "District",
    "designation": "DIET Office"
}, {
    "id": "Deputy Director Elementary",
    "name": "Deputy Director Elementary",
    "scope": "District",
    "designation": "Deputy Director Elementary"
}, {
    "id": "Deputy Director Higher",
    "name": "Deputy Director Higher",
    "scope": "District",
    "designation": "Deputy Director Higher"
}, {
    "id": "Deputy Director Inspection Cadre",
    "name": "Deputy Director Inspection Cadre",
    "scope": "District",
    "designation": "Deputy Director Inspection Cadre"
}, {
    "id": "Director Higher Education",
    "name": "Director Higher Education",
    "scope": "State",
    "designation": "Director Higher Education"
}, {
    "id": "Directorate Elementary Education (office login)",
    "name": "Directorate Elementary Education (office login)",
    "scope": "State",
    "designation": "Directorate Elementary Education (office login)"
}, {
    "id": "Directorate Higher Education (office login)",
    "name": "Directorate Higher Education (office login)",
    "scope": "State",
    "designation": "Directorate Higher Education (office login)"
}, {
    "id": "District Project Officer",
    "name": "District Project Officer",
    "scope": "District",
    "designation": "District Project Officer"
}, {
    "id": "Joint Director Inspection Cadre",
    "name": "Joint Director Inspection Cadre",
    "scope": "State",
    "designation": "Joint Director Inspection Cadre"
}, {
    "id": "State Project Director",
    "name": "State Project Director",
    "scope": "State",
    "designation": "State Project Director"
}, {
    "id": "State Project Office",
    "name": "State Project Office",
    "scope": "State",
    "designation": "State Project Office"
}, {"id": "Test", "name": "Test", "scope": "State", "designation": "Test"}, {
    "id": "Director Elementary Education",
    "name": "Director Elementary Education",
    "scope": "State",
    "designation": "Director Elementary Education"
}]
export const designationESamwaad = [
    {
        designation: "CHT"
    },
    {
        designation: "C&V"
    },
    {
        designation: "DPE"
    },
    {
        designation: "Drawing Master"
    },
    {
        designation: "Head Master"
    },
    {
        designation: "Head Teacher"
    },
    {
        designation: "IT Teacher"
    },
    {
        designation: "JBT"
    },
    {
        designation: "Language Teacher"
    },
    {
        designation: "Lecturer"
    },
    {
        designation: "PET"
    },
    {
        designation: "Principal"
    },
    {
        designation: "Shastri"
    },
    {
        designation: "TGT"
    },
    {
        designation: "Vocational Teacher"
    }
]

export const getLevelFromDesignation = (designation: string) => {
    const item = designationLevels.find((d) => designation === d.designation);
    return item?.scope;
}
