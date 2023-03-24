const testTalent = {
    id: 11,
    name: "Maksym",
    surname: "Khudoliy",
    profilePicture:"https://upload.wikimedia.org/wikipedia/commons/1/15/Cat_August_2010-4.jpg",
    kindOfTalent: "Product Owner",
};

const testTalent2 = {
    id: 1,
    name: "Ihor",
    surname: "Korabel",
    profilePicture:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    kindOfTalent: "Artist",
};

const testTalents = [
    { ...testTalent, id: 1 },
    { ...testTalent, id: 2 },
    { ...testTalent, id: 3 },
    { ...testTalent, id: 4 },
    { ...testTalent, id: 5 },
    { ...testTalent, id: 6 },
    { ...testTalent, id: 7 },
    { ...testTalent, id: 8 },
    { ...testTalent, id: 9 }
];

const testTalents2 = [
    { ...testTalent2, id: 1 },
    { ...testTalent2, id: 2 },
    { ...testTalent2, id: 3 },
    { ...testTalent2, id: 4 },
    { ...testTalent2, id: 5 },
    { ...testTalent2, id: 6 },
    { ...testTalent2, id: 7 },
    { ...testTalent2, id: 8 },
    { ...testTalent2, id: 9 },
]; 

const pages = ["Talents", "Proofs"];

const talentsResponseExample = {
    totalCount: 19,
    talents: testTalents
};

const talentsResponseExample2 = {
    totalCount: 18,
    talents: testTalents2
};

export { testTalent, pages, testTalents, talentsResponseExample, talentsResponseExample2 };
