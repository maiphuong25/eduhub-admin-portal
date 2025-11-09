"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/i18n/use-language"
import { getTranslations } from "@/lib/i18n/get-translations"
import { LanguageSwitcher } from "@/components/language-switcher"
import { BasicIcons } from "@/components/icons/basic-icons"

export default function LandingPage() {
  const { language, mounted } = useLanguage()
  const t = mounted ? getTranslations(language) : getTranslations("vi")

  const features = [
    {
      title: t.landing.features.interactiveLearning,
      description: t.landing.features.engageWithDynamic,
      icon: BasicIcons.courses,
    },
    {
      title: t.landing.features.smartAnalytics,
      description: t.landing.features.trackProgressWithDetailed,
      icon: BasicIcons.dashboard,
    },
    {
      title: t.landing.features.collaborativeTools,
      description: t.landing.features.connectWithPeers,
      icon: BasicIcons.students,
    },
    {
      title: t.landing.features.flexibleSchedule,
      description: t.landing.features.learnAtYourOwnPace,
      icon: BasicIcons.categories,
    },
  ]

  const courses = [
    {
      id: 1,
      title: t.landing.courses.webDevelopment,
      category: "Technology",
      level: "Beginner",
      students: 1250,
      color: "from-blue-500 to-cyan-400",
    },
    {
      id: 2,
      title: t.landing.courses.advancedReact,
      category: "Technology",
      level: "Advanced",
      students: 890,
      color: "from-purple-500 to-pink-400",
    },
    {
      id: 3,
      title: t.landing.courses.digitalMarketing,
      category: "Business",
      level: "Beginner",
      students: 2100,
      color: "from-orange-500 to-red-400",
    },
    {
      id: 4,
      title: t.landing.courses.dataSciencePython,
      category: "Technology",
      level: "Intermediate",
      students: 1560,
      color: "from-green-500 to-emerald-400",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg text-white">
              <span className="font-bold text-lg">E</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              EduHub
            </span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link href="/auth/login">
              <Button variant="ghost" className="hover:bg-primary/10">
                {t.nav.login}
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 transition-all duration-300">
                {t.nav.signup}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 gradient-shift" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                  {t.landing.learnFromAnywhere}{" "}
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    {t.landing.anywhere}
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">{t.landing.description}</p>
              </div>
              <div className="flex gap-4 pt-4">
                <Link href="/auth/sign-up">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 text-base font-semibold"
                  >
                    {t.landing.getStartedFree}
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-2 hover:bg-primary/5 bg-transparent">
                  {t.landing.exploreCourses}
                </Button>
              </div>
            </div>
            <div className="relative animate-slide-in-right">
              <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20 backdrop-blur-sm shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-2xl" />
                <div className="relative flex flex-col items-center justify-center h-96 space-y-6">
                  <div className="text-7xl text-primary">📚</div>
                  <div className="text-center space-y-2">
                    <p className="text-2xl font-bold text-foreground">1000+</p>
                    <p className="text-muted-foreground">{t.landing.coursesAvailable}</p>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <div
                      className="w-2 h-2 rounded-full bg-secondary animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              {t.landing.whyChooseEduHub}{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">EduHub?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.landing.everythingYouNeed}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border border-border/50 hover:border-primary/50 bg-gradient-to-br from-white to-primary/5 hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <CardHeader className="space-y-4">
                  <div className="text-4xl text-primary group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            {t.landing.featuredCourses}{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t.landing.featured}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.landing.exploreMostPopular}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-0 bg-white"
            >
              <div
                className={`bg-gradient-to-br ${course.color} h-40 flex items-center justify-center relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                <div className="text-5xl text-white group-hover:scale-110 transition-transform duration-300 relative z-10">
                  {BasicIcons.courses}
                </div>
              </div>
              <CardHeader className="space-y-3">
                <div className="space-y-1">
                  <CardTitle className="text-base line-clamp-2 text-foreground">{course.title}</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">{course.category}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="px-3 py-1 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary rounded-full text-xs font-semibold">
                    {course.level}
                  </span>
                  <span className="text-muted-foreground text-xs font-medium">
                    {course.students.toLocaleString()} {t.landing.students}
                  </span>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                  size="sm"
                >
                  {t.landing.viewCourse}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20 my-12">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white">{t.landing.readyToTransform}</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">{t.landing.joinThousands}</p>
          </div>
          <Link href="/auth/sign-up">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white hover:bg-white/90 text-primary font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {t.landing.signUpNow}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white text-sm font-bold">
                  E
                </div>
                <span className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  EduHub
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.landing.footer.empowering}</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">{t.landing.footer.product}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors duration-200">
                    {t.landing.footer.features}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors duration-200">
                    {t.landing.footer.pricing}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors duration-200">
                    {t.landing.footer.security}
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">{t.landing.footer.company}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors duration-200">
                    {t.landing.footer.about}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors duration-200">
                    {t.landing.footer.blog}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors duration-200">
                    {t.landing.footer.contact}
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">{t.landing.footer.legal}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors duration-200">
                    {t.landing.footer.privacy}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors duration-200">
                    {t.landing.footer.terms}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors duration-200">
                    {t.landing.footer.cookies}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p>{t.landing.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
