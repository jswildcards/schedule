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
      courses: [],
      schedule: {},
      show: [],
    };
  },
  mounted: async function () {
    this.courses = await fetch(
      "https://raw.githubusercontent.com/jswildcards/schedule/main/schedule.json"
    ).then((res) => res.json());

    this.schedule = this.courses.reduce((prev, cur) => {
      cur.dates.forEach((date) => {
        prev = {
          ...prev,
          [date]: [...(prev[date] ?? []), cur.id],
        };
      });

      return prev;
    }, {});

    this.attrs = [
      ...this.attrs,
      ...this.courses.map((course) => ({
        dot: course.color,
        dates: course.dates.map((date) => new Date(date)),
      })),
    ];
  },
  methods: {
    selectDate: function (e) {
      this.show = (this.schedule[e.id] ?? [])
        .map((el) => this.courses.find(({ id }) => el == id))
        .sort((a, b) => (a.time.start > b.time.start ? 1 : -1));
    },
  },
});
