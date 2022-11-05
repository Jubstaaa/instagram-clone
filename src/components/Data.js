const people = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1650689957192-3fbad48cfe7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI3NHx0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    username: "ivan_udoy",
    followedBy: "iso_udoy + 20 more",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1650484543914-e4378649fdb9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI4NHx0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    username: "roadahead",
    followedBy: "ntabucejo + 12 more",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1615965763681-f37b8a36870c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDMwM3x0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    username: "ntabucejo",
    followedBy: "cha_ixgara + 12 more",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1650493102555-561bd77793c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDMxNXx0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    username: "maëvavigie",
    followedBy: "andrmolina + 5 more",
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1650282101540-cc4f4077f0f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDMyM3x0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    username: "stephen_audu",
    followedBy: "ksama + 76 more",
  },
];
const posts = [
  {
    id: "1",
    username: "Maia Habegger",
    profile:
      "https://images.unsplash.com/profile-1517999129746-0a298c444bbd?dpr=1&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff",
    image:
      "https://images.unsplash.com/photo-1611526694451-21db42be4985?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIyfHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500",
    description: "Hello my name İlker and i am 23 years old.",
    likes: "421",
    createdAt: "May 15, 2022",
  },
  {
    id: "2",
    username: "Gift Habeshaw",
    profile:
      "https://images.unsplash.com/profile-1565428858497-02236d6f662e?dpr=1&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff",
    image:
      "https://images.unsplash.com/photo-1597515947454-35baa6fd02bf?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDMxfHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500",
    description:
      "Nullam finibus euismod tincidunt. Proin nec vestibulum purus.",
    likes: "923",
    createdAt: "January 2, 2022",
  },
  {
    id: "3",
    username: "Nathan Dumlao",
    profile:
      "https://images.unsplash.com/profile-1495427732560-fe5248ad6638?dpr=1&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff",
    image:
      "https://images.unsplash.com/photo-1515592614568-6b5248d804a0?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQ2fHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500",
    description: "Curabitur pharetra placerat tellus sed euismod.",
    likes: "122",
    createdAt: "February 14, 2022",
  },
  {
    id: "4",
    username: "Fotis Fotopoulos",
    profile:
      "https://images.unsplash.com/profile-1640103657219-7828a41550d4image?dpr=1&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff",
    image:
      "https://images.unsplash.com/photo-1652720827992-e61f56b66dd4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDk5fHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    description:
      "Etiam sit amet libero ut tellus ultricies porta. Etiam porttitor,",
    likes: "843",
    createdAt: "April 8, 2022",
  },
  {
    id: "5",
    username: "Andres Molina",
    profile:
      "https://images.unsplash.com/profile-1634678315447-cc7d48d7524fimage?dpr=1&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff",
    image:
      "https://images.unsplash.com/photo-1652393958190-736e886a9abd?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEyN3x0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500",
    description:
      "erat, scelerisque ac efficitur quis, dignissim a ante. Pellentesque non sem massa. ",
    likes: "356",
    createdAt: "March 15, 2022",
  },
  {
    id: "6",
    username: "Akindele Ibukun",
    profile:
      "https://images.unsplash.com/profile-1650991426483-32395ccca584?dpr=1&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff",
    image:
      "https://images.unsplash.com/photo-1652437054217-4737d149fb56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEyOXx0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    description:
      "Ut porttitor arcu id quam viverra sollicitudin. Donec accumsan sagittis dui.",
    likes: "976",
    createdAt: "May 10, 2022",
  },
  {
    id: "7",
    username: "sobhan joodi",
    profile:
      "https://images.unsplash.com/profile-1572467029170-d3bcf6ddb544image?dpr=1&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff",
    image:
      "https://images.unsplash.com/photo-1622651783098-cec84061b1dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE0Nnx0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    description:
      "Mauris auctor lacinia nisi, mattis rutrum risus varius eu. Curabitur eu volutpat mauris, ",
    likes: "456",
    createdAt: "April 28, 2022",
  },
  {
    id: "8",
    username: "mehrab zahedbeig",
    profile:
      "https://images.unsplash.com/profile-1644938304095-c7bc47210362image?dpr=1&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff",
    image:
      "https://images.unsplash.com/photo-1651420549140-8cecfdd0bc9c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIxOXx0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500",
    description: "Etiam posuere eros mi",
    likes: "724",
    createdAt: "January 17, 2022",
  },
  {
    id: "9",
    username: "Anton Luk",
    profile:
      "https://images.unsplash.com/profile-1651397998658-0ff9287daebbimage?dpr=1&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff",
    image:
      "https://images.unsplash.com/photo-1651396671873-d549136d73d0?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIyN3x0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500",
    description: "dignissim a ante. Pellentesque non sem massa. ",
    likes: "479",
    createdAt: "May 1, 2022",
  },
  {
    id: "10",
    username: "Mathilde Langevin",
    profile:
      "https://images.unsplash.com/profile-1601327292565-cc4c02215d36image?dpr=1&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff",
    image:
      "https://images.unsplash.com/photo-1651241848876-df639c406c32?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIzN3x0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500",
    description: "interdum interdum.",
    likes: "108",
    createdAt: "May 23, 2022",
  },
  {
    id: "11",
    username: "Bailey Burton",
    profile:
      "https://images.unsplash.com/profile-1639148488743-57a6a47708deimage?dpr=1&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff",
    image:
      "https://images.unsplash.com/photo-1651192498604-68ac887962db?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI2M3x0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500",
    description: "interdum interdum.",
    likes: "356",
    createdAt: "January 19, 2022",
  },
  {
    id: "12",
    username: "Brock Wegner",
    profile:
      "https://images.unsplash.com/profile-1610470233577-32a3cb94e6b8image?dpr=1&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff",
    image:
      "https://images.unsplash.com/photo-1650424362683-25cd36bcf967?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIzNXx0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500",
    description:
      "Integer tempus placerat ipsum, eget tristique mi feugiat eu. Aliquam eu eleifend ipsum. Etiam sit amet libero ut tellus ultricies porta. Etiam porttitor, orci sit amet laoreet vulputate,",
    likes: "113",
    createdAt: "March 20, 2022",
  },
];
const stories = [
  {
    id: "1",
    username: "Jordan Whitfield",
    image:
      "https://images.unsplash.com/photo-1516575334481-f85287c2c82d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDl8UzRNS0xBc0JCNzR8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "2",
    username: "Karina Tess",
    image:
      "https://images.unsplash.com/photo-1653471394692-e5b350475d0b?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIwfFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500",
  },
  {
    id: "3",
    username: "Victoria Rokita",
    image:
      "https://images.unsplash.com/photo-1617968763460-48f12e7351d2?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDMwfFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500",
  },
  {
    id: "4",
    username: "Ali Choubin",
    image:
      "https://images.unsplash.com/photo-1653276310012-9ac8581befc5?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDMxfFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500",
  },
  {
    id: "5",
    username: "Ruslan Zaplatin",
    image:
      "https://images.unsplash.com/photo-1652877348203-b27dd1b4b12c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQxfFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500",
  },
  {
    id: "6",
    username: "Megan Ruth",
    image:
      "https://images.unsplash.com/photo-1649878974575-017d4dd5b6f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDU2fFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "7",
    username: "Laura Chouette",
    image:
      "https://images.unsplash.com/photo-1650338524059-f0ae486cfa66?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDU5fFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500",
  },
  {
    id: "8",
    username: "Filipp Romanovski",
    image:
      "https://images.unsplash.com/photo-1651083419411-b6a68cfcc07a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDExOHxTNE1LTEFzQkI3NHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "9",
    username: "Sergey Vinogradov",
    image:
      "https://images.unsplash.com/photo-1651129986050-3172a56142e6?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDExOXxTNE1LTEFzQkI3NHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500",
  },
  {
    id: "10",
    username: "Brock Wegner",
    image:
      "https://images.unsplash.com/photo-1651493284447-8ef2730601d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEyNXxTNE1LTEFzQkI3NHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "11",
    username: "Omid Armin",
    image:
      "https://images.unsplash.com/photo-1650795754086-0d4c413e549a?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE1OHxTNE1LTEFzQkI3NHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500",
  },
  {
    id: "12",
    username: "Laura Chouette",
    image:
      "https://images.unsplash.com/photo-1650860918873-bd32a96f08f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE1MHxTNE1LTEFzQkI3NHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  },
];

export { people, posts, stories };
