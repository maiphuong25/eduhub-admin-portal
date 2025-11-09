"use client"

export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Layers, Plus, Edit2, Trash2 } from "lucide-react"

export default function CategoriesPage() {
  const [profile, setProfile] = useState<any>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const supabase = createClient()

  useEffect(() => {
    const loadCategories = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      setProfile(profileData)

      if (profileData?.role === "admin") {
        const { data: categoriesList } = await supabase.from("categories").select("*").order("name")

        setCategories(categoriesList || [])
      }

      setLoading(false)
    }

    loadCategories()
  }, [supabase])

  const handleSave = async () => {
    if (!name.trim()) return

    if (editingId) {
      const { error } = await supabase.from("categories").update({ name, description }).eq("id", editingId)

      if (!error) {
        setCategories(categories.map((c) => (c.id === editingId ? { ...c, name, description } : c)))
        resetForm()
      }
    } else {
      const { data, error } = await supabase.from("categories").insert({ name, description }).select()

      if (!error && data) {
        setCategories([...categories, data[0]])
        resetForm()
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return

    const { error } = await supabase.from("categories").delete().eq("id", id)

    if (!error) {
      setCategories(categories.filter((c) => c.id !== id))
    }
  }

  const handleEdit = (category: any) => {
    setEditingId(category.id)
    setName(category.name)
    setDescription(category.description || "")
    setShowForm(true)
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingId(null)
    setName("")
    setDescription("")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Categories</h1>
          <p className="text-muted-foreground mt-2">Manage course categories</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="gap-2 bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4" />
            Add Category
          </Button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="catName">Category Name *</Label>
              <Input
                id="catName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Technology"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="catDesc">Description</Label>
              <textarea
                id="catDesc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe this category..."
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground min-h-20"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                {editingId ? "Update" : "Create"}
              </Button>
              <Button onClick={resetForm} variant="outline">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="text-center py-12">
          <Layers className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2 animate-pulse" />
          <p className="text-muted-foreground">Loading categories...</p>
        </div>
      ) : categories.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Card key={category.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  {category.description && <p className="text-sm text-muted-foreground">{category.description}</p>}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(category)} className="gap-2 flex-1">
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(category.id)} className="gap-2">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Layers className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No categories yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
