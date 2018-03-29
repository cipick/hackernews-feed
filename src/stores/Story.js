export default class Story {
  id: number
  index: number
  title: string
  type: string
  by: string
  url: string
  descendants: number
  score: number
  time: number
  visited: boolean = false
}
