import firebase from '$/utils/firebase'
import prisma from '$/prisma/prisma'
import moment from 'moment'
import fs from 'fs'

import { createCanvas, loadImage } from 'canvas'
import { TodoCreateBody } from '$/types'

/**
 * create
 */
export const createTodo = async (body: TodoCreateBody) => {
  const { title, due_date, userId } = body

  const todo = await prisma.todo.create({
    data: {
      title,
      due_date,
      userId
    }
  })

  return todo
}

/**
 * update
 */
export const updateTodo = async (id: number) => {
  try {
    const todo = await prisma.todo.update({
      where: { id },
      data: {
        done: true
      }
    })

    await createOgp(todo.id, true)

    return todo
  } catch (e) {
    if (e.code === 'P2025') {
      throw Object.assign(new Error('Todoが存在しません。'), { status: 404 })
    } else {
      throw Object.assign(new Error(e), { status: 500 })
    }
  }
}

/**
 * create ogp
 */
export const createOgp = async (todoId: number, isDeadline: boolean) => {
  const localTargetPath = __dirname + '/static/image/ogp.png'
  const localBasePath = __dirname + '/static/image/haikei.png'
  const fbTargetPath = `ogps/${todoId}.png`
  const fbBasePath = 'ogp/haikei.png'

  try {
    const bucket = firebase.storage().bucket()

    // Base Image DonwLoad
    await bucket.file(fbBasePath).download({ destination: localBasePath })

    const canvas = await settingCanvas(localBasePath, isDeadline)

    const buf = canvas.toBuffer()

    fs.writeFileSync(localTargetPath, buf)

    await bucket.upload(localTargetPath, {
      destination: fbTargetPath,
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: todoId
        }
      }
    })
  } finally {
    fs.unlinkSync(localBasePath)
    fs.unlinkSync(localTargetPath)
  }
}

/**
 * Canvasの設定をしてcanvasを返します。
 */
const settingCanvas = async (localBasePath: string, isDeadline: boolean) => {
  // Canvas Setting
  const canvas = createCanvas(640, 480)
  const ctx = canvas.getContext('2d')

  // ベース画像の描画
  const baseImage = await loadImage(localBasePath)
  ctx.drawImage(baseImage, 0, 0, 640, 480)

  const defaultFont = "bold 30px 'ＭＳ 明朝'"
  const boldFont = "bold 45px 'ＭＳ 明朝'"

  ctx.textBaseline = 'top'
  ctx.textAlign = 'center'

  if (isDeadline) {
    // 20文字制限
    ctx.font = boldFont
    ctx.fillStyle = 'red'
    ctx.fillText('部屋の掃除', 320, 130)

    ctx.font = defaultFont
    ctx.fillStyle = 'black'
    ctx.fillText('を期日までに終わらせられなかったです。', 325, 200)

    ctx.font = boldFont
    ctx.fillText('次は!!!', 325, 240)

    ctx.font = defaultFont
    ctx.fillText('きちんと決めた期日までにやり遂げます。', 325, 300)
  } else {
    ctx.font = boldFont
    ctx.fillStyle = 'red'
    ctx.fillText('部屋の掃除', 320, 130)

    ctx.font = defaultFont
    ctx.fillStyle = 'black'
    ctx.fillText('を期日までに終わらせました!!!。', 325, 200)
  }

  return canvas
}

/**
 * Todoが期限切れかどうかチェックする。
 */
const checkOverDueDate = async (dueDate: Date) => {
  const format = 'YYYY-MM-DD'
  const today = moment().format(format)
  const dueday = moment(dueDate).format(format)

  console.log(today)
  console.log(dueday)

  const isDueOverDay = moment(today).isSameOrAfter(dueday)

  return isDueOverDay
}

export const __local__ = {
  checkOverDueDate
}
