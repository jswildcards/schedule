new Vue({
  el: "#app",
  data: function () {
    return {
      attrs: [
        {
          key: "today",
          highlight: true,
          dates: new Date(),
        },
      ],
      schedule: {},
      show: [],
    };
  },
  mounted: async function () {
    const schedule = await fetch(
      "https://raw.githubusercontent.com/jswildcards/schedule/main/schedule.json"
    ).then((res) => res.json());

    this.schedule = schedule.reduce((prev, cur) => {
      cur.dates.forEach((date) => {
        prev = {
          ...prev,
          [date]: [...(prev[date] ?? []), cur.id],
        };
      });

      return prev;
    }, {});

    console.log(Object.keys(this.schedule).length);
  },
  methods: {
    selectDate: function (e) {
      this.show = schedule[e.id] ?? [];
    },
  },
});
