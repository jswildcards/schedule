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
      allCourses: [],
      url: "https://raw.githubusercontent.com/jswildcards/schedule/main/data.json",
    };
  },
  mounted: async function () {
    this.allCourses = await fetch(this.url)
      .then((res) => res.json())
      .then((res) =>
        res.schedule.sort((a, b) => (a.time.start > b.time.start ? 1 : -1))
      );

    this.schedule = this.allCourses.reduce((prev, cur) => {
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
      ...this.allCourses.map((course) => ({
        dot: course.color,
        dates: course.dates.map((date) => new Date(date)),
      })),
    ];
  },
  methods: {
    selectDate: function (e) {
      this.courses = (this.schedule[e.id] ?? []).map((el) =>
        this.allCourses.find(({ id }) => el == id)
      );
    },
  },
});
