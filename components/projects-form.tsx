import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import type { ResumeData } from "@/lib/types";
import { defaultResumeData } from "@/lib/default-data";

interface ProjectsFormProps {
  projects: ResumeData["projects"];
  addProject: () => void;
  updateProject: (index: number, field: string, value: string | string[]) => void;
  removeProject: (index: number) => void;
  addProjectDetail: (projIndex: number) => void;
  updateProjectDetail: (projIndex: number, detailIndex: number, value: string) => void;
  removeProjectDetail: (projIndex: number, detailIndex: number) => void;
}

export default function ProjectsForm({
  projects,
  addProject,
  updateProject,
  removeProject,
  addProjectDetail,
  updateProjectDetail,
  removeProjectDetail,
}: ProjectsFormProps) {
  return (
    <>
      {projects.map((project, index) => (
        <Card key={index} className="mb-4">
          <CardContent className="pt-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Project #{index + 1}</h3>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeProject(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Project Name</label>
                <Input
                  value={project.name}
                  onChange={(e) => updateProject(index, "name", e.target.value)}
                  placeholder={defaultResumeData.projects[index % defaultResumeData.projects.length].name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Technologies</label>
                <Input
                  value={project.technologies}
                  onChange={(e) => updateProject(index, "technologies", e.target.value)}
                  placeholder={defaultResumeData.projects[index % defaultResumeData.projects.length].technologies}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <Input
                  value={project.date}
                  onChange={(e) => updateProject(index, "date", e.target.value)}
                  placeholder="June 2020 – Present"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Details</label>
                {project.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex gap-2 mb-2">
                    <Textarea
                      value={detail}
                      onChange={(e) => updateProjectDetail(index, detailIndex, e.target.value)}
                      placeholder={defaultResumeData.projects[index % defaultResumeData.projects.length].details[detailIndex % defaultResumeData.projects[index % defaultResumeData.projects.length].details.length]}
                      className="min-h-[80px]"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeProjectDetail(index, detailIndex)}
                      disabled={project.details.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={() => addProjectDetail(index)}
                  size="sm"
                  variant="outline"
                  className="mt-1"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Detail
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button onClick={addProject} className="w-full" disabled={projects.length >= 2}>
        <Plus className="h-4 w-4 mr-2" /> Add Project
      </Button>
    </>
  );
}