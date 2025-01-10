using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class FormService
    {
        private readonly AppDbContext _context;
        
        public FormService(AppDbContext context)
        {
            this._context = context;
        }

        public async Task<Form> CreateFormAsync(Form form)
        {
            _context.Forms.Add(form);
            await _context.SaveChangesAsync();
            return form;
        }

        public async Task<List<Form>> GetFormsAsync()
        {
            return await _context.Forms.Include(f => f.Fields).ToListAsync();
        }

        public async Task<Form> GetFormByIdAsync(int id)
        {
            var form = await _context.Forms.FindAsync(id);
            if (form == null)
            {
                throw new KeyNotFoundException("Form not found.");
            }
            return form;
        }

        public async Task<bool> DeleteFormAsync(int id)
        {
            var form = await _context.Forms.FindAsync(id);
            if (form == null)
            {
                return false;
            }

            _context.Forms.Remove(form);
            await _context.SaveChangesAsync();
            return true; 
        }

    }
}