
export const mockData = {
  themes: [
    {
      id: '1',
      title: 'Napa Trip',
      icon: '🍷',
      color: 'from-purple-600 to-red-600',
      totalAmount: 847.32,
      totalPeople: 4,
      receipts: [
        {
          id: '1-1',
          title: 'Auberge du Soleil',
          total: 284.50,
          payer: 'Alex',
          image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
          date: 'March 15, 2024',
          people: ['1', '2', '3', '4'],
          items: [
            {
              id: '1-1-1',
              name: 'Wine Tasting Flight',
              price: 45.00,
              tags: ['Alcohol'],
              assignedTo: ['1', '2', '3', '4']
            },
            {
              id: '1-1-2',
              name: 'Cheese Board',
              price: 28.00,
              tags: ['Appetizer'],
              assignedTo: ['1', '2', '3', '4']
            },
            {
              id: '1-1-3',
              name: 'Duck Confit',
              price: 42.00,
              tags: ['Main Course'],
              assignedTo: ['1', '2']
            },
            {
              id: '1-1-4',
              name: 'Salmon',
              price: 38.00,
              tags: ['Main Course'],
              assignedTo: ['3', '4']
            }
          ]
        },
        {
          id: '1-2',
          title: 'Oxbow Public Market',
          total: 156.82,
          payer: 'Sarah',
          image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400&h=300&fit=crop',
          date: 'March 16, 2024',
          people: ['1', '2', '3', '4'],
          items: [
            {
              id: '1-2-1',
              name: 'Artisan Coffee',
              price: 24.00,
              tags: ['Drinks'],
              assignedTo: ['1', '2', '3', '4']
            },
            {
              id: '1-2-2',
              name: 'Local Honey',
              price: 18.00,
              tags: [],
              assignedTo: ['2']
            }
          ]
        }
      ]
    },
    {
      id: '2',
      title: "Sarah's Birthday",
      icon: '🎉',
      color: 'from-pink-600 to-purple-600',
      totalAmount: 392.45,
      totalPeople: 6,
      receipts: [
        {
          id: '2-1',
          title: 'Birthday Dinner',
          total: 267.30,
          payer: 'Mike',
          image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
          date: 'April 3, 2024',
          people: ['1', '2', '3', '4'],
          items: [
            {
              id: '2-1-1',
              name: 'Birthday Cake',
              price: 35.00,
              tags: ['Dessert'],
              assignedTo: ['1', '2', '3', '4']
            },
            {
              id: '2-1-2',
              name: 'Champagne',
              price: 65.00,
              tags: ['Alcohol'],
              assignedTo: ['1', '2', '3', '4']
            }
          ]
        }
      ]
    }
  ]
};
